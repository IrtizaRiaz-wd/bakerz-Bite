<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- The 3D bakery scene is plain Three.js in `src/experience/scene.ts`, driven only by a scroll progress value from GSAP ScrollTrigger in `Experience.tsx`; keep scene logic out of React so it can be disposed cleanly.
- Demo product data lives in `src/data/products.ts`; filtering/rating maths in `src/lib/catalogue.ts` (covered by tests).
