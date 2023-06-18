import { Button } from "@/components/ui/Button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { api } from "@/utils/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/Select";

const formSchema = z.object({
  name: z.string().nonempty("Please enter a name"),
  description: z.string(),
  url: z.string().url().nonempty("Please enter a URL"),
  size: z.enum(["small", "medium", "large"]),
});

const placeholders = {
  name: "IETF Foundation",
  description: "IETF Foundation",
  url: "IETF Foundation",
  size: "Select a size",
};

interface ICreateWidgetDialogProps {
  onClose: () => void;
  dashboard: string;
}

function CreateWidgetDialog(props: ICreateWidgetDialogProps) {
  const createWidget = api.cards.createWidget.useMutation({
    onSuccess: () => props.onClose(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      url: "",
      size: "small",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    await createWidget.mutateAsync({ ...values, dashboard: props.dashboard });
    form.reset();
  }

  return (
    <DialogContent className="sm:max-w-2xl">
      <DialogHeader>
        <DialogTitle>Create new widget</DialogTitle>
        <DialogDescription>
          Create a new widget and add it to your board.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex-grow">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder={placeholders.name} {...field} />
                  </FormControl>
                  <FormDescription>
                    Choose a name for your card.
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
                    <Input placeholder={placeholders.description} {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter a description for your widget.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="size"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Size</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={placeholders.size} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormDescription>
                    Select a size for the widget
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL</FormLabel>
                  <FormControl>
                    <Input placeholder={placeholders.url} {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the URL for the widget.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <DialogFooter>
            <Button type="submit">Create card</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}

export default CreateWidgetDialog;
