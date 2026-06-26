const { marked } = require("marked");

module.exports = function (eleventyConfig) {
  // Pass through static assets unchanged
  eleventyConfig.addPassthroughCopy("css");
  eleventyConfig.addPassthroughCopy("js");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("admin/config.yml");
  eleventyConfig.addPassthroughCopy("robots.txt");

  // Exclude docs and node_modules
  eleventyConfig.ignores.add("docs/**");
  eleventyConfig.ignores.add("node_modules/**");

  // Blog collection sorted newest first
  eleventyConfig.addCollection("blog", function (collectionApi) {
    return collectionApi
      .getFilteredByGlob("posts/*.md")
      .sort((a, b) => b.date - a.date);
  });

  // Get all unique categories that have at least one post
  eleventyConfig.addFilter("activeCategories", function (posts) {
    const cats = new Set();
    posts.forEach((p) => {
      if (p.data.category) cats.add(p.data.category);
    });
    return [...cats].sort();
  });

  // Date formatting
  eleventyConfig.addFilter("dateDisplay", function (date) {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  });

  eleventyConfig.addFilter("dateISO", function (date) {
    return new Date(date).toISOString().split("T")[0];
  });

  // Slug filter
  eleventyConfig.addFilter("slug", function (str) {
    return str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  });

  return {
    dir: {
      input: ".",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts",
    },
    // Only process these file types through Eleventy
    templateFormats: ["md", "njk", "html"],
    // Don't process the main index.html and thank-you.html through Eleventy templating
    htmlTemplateEngine: false,
    markdownTemplateEngine: "njk",
  };
};
