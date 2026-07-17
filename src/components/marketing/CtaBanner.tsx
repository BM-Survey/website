import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

type CtaBannerProps = {
  title: string;
  subtitle: string;
  buttonLabel: string;
  buttonHref: string;
  size?: "md" | "lg";
};

/** Gradient CTA banner shared by the standalone marketing pages. */
export function CtaBanner({
  title,
  subtitle,
  buttonLabel,
  buttonHref,
  size = "lg",
}: CtaBannerProps) {
  return (
    <section
      className={size === "lg" ? "px-6 pt-5 pb-32" : "px-6 pb-24"}
      aria-label={title}
    >
      <Container
        size="md"
        className={
          "relative overflow-hidden rounded-[36px] bg-gradient-to-br from-primary to-primary-dark text-center " +
          (size === "lg" ? "px-6 py-19 sm:px-10" : "px-6 py-16 sm:px-10")
        }
      >
        <div
          className="absolute -top-2/5 -start-[5%] h-[400px] w-[400px] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.18),transparent_60%)]"
          aria-hidden
        />
        {size === "lg" && (
          <div
            className="absolute -bottom-[45%] -end-[5%] h-[460px] w-[460px] rounded-full bg-[radial-gradient(circle,rgba(34,195,94,0.28),transparent_62%)]"
            aria-hidden
          />
        )}
        <div className="relative">
          <h2
            className={
              "mb-4 font-display leading-[1.08] font-black tracking-tight text-white " +
              (size === "lg"
                ? "text-[clamp(32px,4.2vw,54px)]"
                : "text-[clamp(26px,3.6vw,42px)]")
            }
          >
            {title}
          </h2>
          <p className="mx-auto mb-7 max-w-[440px] text-[17px] leading-relaxed text-[#d8e1ff]">
            {subtitle}
          </p>
          <Button href={buttonHref} variant="white">
            {buttonLabel}
          </Button>
        </div>
      </Container>
    </section>
  );
}
