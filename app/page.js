import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <h1 className="">Hello world!</h1>
      <Button variant="ghost">Subscribe</Button>

      <UserButton />
    </div>
  );
}
