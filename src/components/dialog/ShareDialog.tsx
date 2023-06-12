import React from "react";
import { Button } from "@/components/ui/Button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { DropdownMenuTrigger } from "../ui/DropdownMenu";
import { DropdownMenu } from "../ui/DropdownMenu";
import { DropdownMenuContent } from "../ui/DropdownMenu";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";

const formSchema = z.object({
  link: z
    .string()
    .url("Must be a valid URL")
    .nonempty("Please enter a link slug"),
  invite: z
    .string()
    .email("Must be a valid email address")
    .nonempty("Please enter an email address"),
});

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IShareDialogProps {}

function ShareDialog(props: IShareDialogProps) {
  const [members, setMembers] = React.useState<
    { name: string; email: string }[]
  >([
    { name: "You", email: "you@gmail.com" },
    { name: "Another", email: "another@gmail.com" },
  ]);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      link: "https://quicklinks.io/123456",
      invite: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    form.reset();
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Share dashboard</DialogTitle>
        <DialogDescription>
          Share this dashboard with your team.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-8">
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormLabel>Share Link</FormLabel>
                  <FormControl>
                    <Input placeholder="Share Link" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="invite"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormLabel>Invite People</FormLabel>
                  <FormControl>
                    <div className="flex flex-row gap-2">
                      <Input
                        placeholder="Search..."
                        {...field}
                        className="flex-shrink"
                      />
                      <Button>Invite</Button>
                    </div>
                  </FormControl>
                  <FormDescription>
                    Search for people to invite to your dashboard here
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="mt-8">
              <FormLabel>Members</FormLabel>
              <div className="flex flex-col gap-4">
                {members.map(({ name, email }, i) => (
                  <div
                    className="flex items-center justify-between py-2"
                    key={i}
                  >
                    <div className="flex flex-grow flex-col justify-start">
                      <h2 className="font-semibold">{name}</h2>
                      <h2 className="font-light text-black/50">{email}</h2>
                    </div>
                    <Select>
                      <SelectTrigger className="w-max">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value={"edit"}>Can Edit</SelectItem>
                        <SelectItem value={"view"}>Can View</SelectItem>
                        <SelectItem value={"admin"}>Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter className="mt-8">
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}

export default ShareDialog;
