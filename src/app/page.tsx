export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] p-8">
            <h1 className="text-4xl font-bold mb-4">Welcome to Your New App</h1>
            <p className="text-lg text-muted-foreground max-w-2xl text-center">
                This is the home page. The Header and Footer are already integrated into the layout.
                You can start building your features in the <code>src/features</code> directory.
            </p>

            <div className="flex gap-4 mt-8">
                <button className="px-6 py-3 rounded-lg bg-foreground text-background font-medium hover:opacity-90 transition-opacity">
                    Get Started
                </button>
                <button className="px-6 py-3 rounded-lg border border-foreground/20 hover:bg-foreground/5 transition-colors">
                    Learn More
                </button>
            </div>
        </div>
    );
}
