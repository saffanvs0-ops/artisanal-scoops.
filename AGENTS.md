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

- Keep section navigation on the shop page; derive visibility from persisted account roles while database RLS remains the write-security boundary.
- Store footer partner links in website_settings.apps and validate HTTP/HTTPS URLs before rendering links, so custom apps cannot inject unsafe schemes.
- Protected role-management functions must validate the bearer session and query the caller's database role before importing the privileged client.
- Keep modal content above the bottom badge area with a scrollable body, so action buttons remain reachable on small screens.
- Orders are inserted from the storefront checkout into public.orders (anon+authenticated INSERT allowed; only staff roles can read/update); staff, staff_tasks, and staff_messages are readable by staff roles, so operational data never leaks to customers.
