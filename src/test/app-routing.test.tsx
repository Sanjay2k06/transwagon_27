import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { routeTree } from "@/routeTree.gen";

describe("App routing", () => {
  const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

  it("matches a page for / instead of falling back to not found", () => {
    const matches = router.matchRoutes("/");
    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it("matches a page for /about", () => {
    const matches = router.matchRoutes("/about");
    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it("matches a page for /services", () => {
    const matches = router.matchRoutes("/services");
    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it("matches a page for /gallery", () => {
    const matches = router.matchRoutes("/gallery");
    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it("matches a page for /contact", () => {
    const matches = router.matchRoutes("/contact");
    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });
});
