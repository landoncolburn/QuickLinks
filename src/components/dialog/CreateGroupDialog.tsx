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

const formSchema = z.object({
  name: z.string().nonempty("Please enter a name"),
});

const placeholders = {
  name: "IETF Foundation",
};

interface ICreateGroupDialogProps {
  onClose: () => void;
  dashboard: string;
}

function CreateGroupDialog(props: ICreateGroupDialogProps) {
  const createGroup = api.cards.createGroup.useMutation({
    onSuccess: () => props.onClose(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const previewName = form.watch("name");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // await createCard.mutateAsync({ ...values, dashboard: props.dashboard });
    await createGroup.mutateAsync({ ...values, dashboard: props.dashboard });
    form.reset();
  }

  return (
    <DialogContent className="sm:max-w-2xl">
      <DialogHeader>
        <DialogTitle>Create new group</DialogTitle>
        <DialogDescription>
          Create a new group and add it to your board.
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
          </div>
          <DialogFooter>
            <Button type="submit">Create group</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}

export default CreateGroupDialog;
