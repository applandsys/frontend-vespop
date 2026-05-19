export function Button({ className = "", ...props }) {
    return (
        <button
            {...props}
            className={
                "inline-flex items-center justify-center rounded-xl bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/90 disabled:opacity-50 " +
                className
            }
        />
    );
}