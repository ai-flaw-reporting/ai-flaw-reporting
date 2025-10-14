import type { Preview } from "@storybook/nextjs";
import { Inter, Geist } from "next/font/google";
import "../src/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "light",
      values: [
        { name: "light", value: "#ffffff" },
        { name: "dark", value: "#0f172a" },
        { name: "gray", value: "#f9fafb" },
      ],
    },
  },
  decorators: [
    (Story) => (
      <div className={`${inter.variable} ${geist.variable} font-sans`}>
        <Story />
      </div>
    ),
  ],
};

export default preview;
