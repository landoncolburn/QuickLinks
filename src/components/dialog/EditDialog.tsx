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
import { Textarea } from "../ui/Textarea";

const formSchema = z.object({
  title: z.string().nonempty("Please enter a title"),
  description: z.string().optional(),
});

interface IEditDialogProps {
  onUpdate: ({
    title,
    description,
  }: {
    title: string;
    description?: string;
  }) => void;
  title: string;
  description?: string;
}

function EditDialog(props: IEditDialogProps) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: props.title,
      description: props.description,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    props.onUpdate(values);
    form.reset();
  }

  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Edit dashboard</DialogTitle>
        <DialogDescription>
          Make changes to your dashboard here. Click save when you&apos;re done.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder={"Dashboard Title"} {...field} />
                  </FormControl>
                  <FormDescription>
                    Choose a title for your dashboard.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder={
                        "Long form description explaining the dashboard. Markdown is supported."
                      }
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Enter a meaningful description for the dashboard.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <DialogFooter className="mt-8">
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}

export default EditDialog;
