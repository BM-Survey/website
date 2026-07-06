/** Route-level loading UI shown while the page streams from the server. */
export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg">
      <span
        role="status"
        aria-live="polite"
        className="h-12 w-12 animate-[spin_1s_linear_infinite] rounded-full border-4 border-primary-soft border-t-primary"
      />
    </div>
  );
}
