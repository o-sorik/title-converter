import type { ReactElement } from "react"

export interface OgImageLayoutProps {
    title: string
    subtitle?: string
}

export function ogImageLayout({ title, subtitle }: OgImageLayoutProps): ReactElement {
    return (
        <div
            style={{
                width: 1200,
                height: 630,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                background: "linear-gradient(135deg, #312e81 0%, #4338ca 50%, #6366f1 100%)",
                color: "#ffffff",
                fontFamily: "sans-serif",
                padding: 60,
                position: "relative",
            }}
        >
            {/* Logo mark */}
            <div
                style={{
                    width: 72,
                    height: 72,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 16,
                    background: "rgba(255,255,255,0.15)",
                    fontSize: 44,
                    fontWeight: 800,
                    letterSpacing: -2,
                    marginBottom: 32,
                }}
            >
                T
            </div>

            {/* Title */}
            <div
                style={{
                    fontSize: title.length > 50 ? 40 : 52,
                    fontWeight: 700,
                    textAlign: "center",
                    lineHeight: 1.2,
                    maxWidth: 900,
                }}
            >
                {title}
            </div>

            {/* Subtitle */}
            {subtitle ? (
                <div
                    style={{
                        fontSize: 24,
                        fontWeight: 400,
                        marginTop: 16,
                        opacity: 0.8,
                        textAlign: "center",
                        maxWidth: 700,
                    }}
                >
                    {subtitle}
                </div>
            ) : null}

            {/* Domain watermark */}
            <div
                style={{
                    position: "absolute",
                    bottom: 32,
                    right: 48,
                    fontSize: 18,
                    opacity: 0.5,
                }}
            >
                titlecaseconverter.online
            </div>
        </div>
    )
}
