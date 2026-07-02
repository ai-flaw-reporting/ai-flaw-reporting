import { reshapePublicReport } from "../utils/reshape-public-report";

export default {
  async find(ctx) {
    const { page, pageSize } = ctx.query;

    const { results, pagination } = await strapi
      .service("api::flare.submissions")
      .findPublicSubmissions({
        page: page ? Number(page) : undefined,
        pageSize: pageSize ? Number(pageSize) : undefined,
      });

    ctx.body = {
      data: results.map(reshapePublicReport),
      meta: { pagination },
    };
  },
};
