import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <p>Ghost AI</p>
      <Button variant={"destructive"}>Click me</Button>
      <Button variant={"outline"}>Click me</Button>
      <Button variant={"secondary"}>Click me</Button>
      <Button variant={"ghost"}>Click me</Button>
      <Button variant={"link"}>Click me</Button>
      <Button variant={"default"}>Click me</Button>
    </main>
  );
}
