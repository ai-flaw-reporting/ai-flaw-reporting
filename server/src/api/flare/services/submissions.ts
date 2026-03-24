const MAX_PAGE_SIZE = 100;
const DEFAULT_PAGE_SIZE = 25;

export default ({ strapi }) => ({
  async findPublicSubmissions(params: { page?: number; pageSize?: number }) {
    const page = params.page || 1;
    const pageSize = Math.min(params.pageSize || DEFAULT_PAGE_SIZE, MAX_PAGE_SIZE);

    const filters = {
      disclosure_publicDisclosureIntent: {
        $in: ["yes", "already"],
      },
    };

    const [entries, count] = await Promise.all([
      strapi.documents("api::report.report").findMany({
        filters,
        limit: pageSize,
        start: (page - 1) * pageSize,
        sort: { createdAt: "desc" },
      }),
      strapi.documents("api::report.report").count({ filters }),
    ]);

    return {
      results: entries,
      pagination: {
        page,
        pageSize,
        pageCount: Math.ceil(count / pageSize),
        total: count,
      },
    };
  },
});
