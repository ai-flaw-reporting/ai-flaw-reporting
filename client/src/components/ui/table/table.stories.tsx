import type { Meta, StoryObj } from "@storybook/nextjs";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
} from "./index";

const meta = {
  title: "UI/Table",
  component: Table,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Table>
      <TableCaption>A list of recent reports</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Report ID</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-right">Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>#1234</TableCell>
          <TableCell>Security Flaw</TableCell>
          <TableCell>Open</TableCell>
          <TableCell className="text-right">2024-01-15</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>#1235</TableCell>
          <TableCell>Bias Detection</TableCell>
          <TableCell>Closed</TableCell>
          <TableCell className="text-right">2024-01-14</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>#1236</TableCell>
          <TableCell>Privacy Concern</TableCell>
          <TableCell>Open</TableCell>
          <TableCell className="text-right">2024-01-13</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Table>
      <TableCaption>Summary of reports by category</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Category</TableHead>
          <TableHead>Total Reports</TableHead>
          <TableHead>This Month</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Security Flaw</TableCell>
          <TableCell>245</TableCell>
          <TableCell>28</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Bias Detection</TableCell>
          <TableCell>180</TableCell>
          <TableCell>15</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Privacy Concern</TableCell>
          <TableCell>120</TableCell>
          <TableCell>12</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Performance Issue</TableCell>
          <TableCell>98</TableCell>
          <TableCell>8</TableCell>
        </TableRow>
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell>643</TableCell>
          <TableCell>63</TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  ),
};
