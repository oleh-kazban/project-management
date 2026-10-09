// props

// title: string
// tasks: number
const SidebarItem = () => {
    return (<a
        href="#"
        aria-current="page"
        className="flex items-center gap-3 rounded-xl border border-accent/15 bg-accent/[0.08] px-3 py-3 text-sm text-foreground shadow-[inset_2px_0_0_0_rgb(var(--color-accent))]"
    >
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-accent/10 text-xs font-semibold text-accent-soft">
            LR
        </span>
        <span className="min-w-0 flex-1">
            <span className="block truncate font-medium">Learning React</span>
            <span className="mt-1 block text-xs text-foreground-subtle">3 tasks</span>
        </span>
        <span className="h-2 w-2 rounded-full bg-accent" />
    </a>
    );
}

export default SidebarItem;