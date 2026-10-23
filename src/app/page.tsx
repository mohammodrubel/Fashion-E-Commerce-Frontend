import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border px-6 py-4 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-primary">Fashion Store</h1>
        <div className="flex items-center gap-3">
          <Input placeholder="Search..." className="w-64" />
          <Button variant="default">Shop Now</Button>
          <Button variant="outline">Sign In</Button>
        </div>
      </header>

      <section className="px-6 py-16 text-center">
        <Badge className="mb-4">New Collection</Badge>
        <h2 className="text-4xl font-bold tracking-tight mb-4">Elegant Fashion for Every Occasion</h2>
        <p className="text-muted-foreground text-lg max-w-xl mx-auto mb-8">
          Discover timeless pieces crafted with care. Style that speaks for itself.
        </p>
        <div className="flex gap-3 justify-center">
          <Button size="lg">Explore Collection</Button>
          <Button size="lg" variant="outline">View Lookbook</Button>
        </div>
      </section>

      <section className="px-6 pb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {["Casual Wear", "Evening Gowns", "Streetwear"].map((category) => (
          <Card key={category} className="hover:shadow-md transition-shadow cursor-pointer">
            <div className="h-48 bg-accent rounded-t-lg" />
            <CardHeader>
              <CardTitle>{category}</CardTitle>
              <CardDescription>Explore our latest {category.toLowerCase()} collection</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="secondary" className="w-full">Browse</Button>
            </CardContent>
          </Card>
        ))}
      </section>

      <section className="px-6 pb-16 max-w-5xl mx-auto">
        <h3 className="text-2xl font-semibold mb-6">Component Preview</h3>
        <div className="flex flex-wrap gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </div>
      </section>
    </main>
  );
}
