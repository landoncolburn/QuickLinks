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
import Card from "../Card";
import { api } from "@/utils/api";

const formSchema = z.object({
  name: z.string().nonempty("Please enter a name"),
  link: z
    .string()
    .url("Please enter a valid URL")
    .nonempty("Please enter a link"),
  description: z.string().nonempty("Please enter a description"),
  color: z
    .string()
    .regex(/^#[0-9a-f]{6}$/i, "Please enter a valid color")
    .nonempty("Please enter a color"),
});

const placeholders = {
  name: "IETF Foundation",
  link: "https://ietf.org",
  description:
    "The Internet Engineering Task Force is a non-profit standards organization.",
  color: "#453225",
};

interface ICreateDialogProps {
  onClose: () => void;
}

function CreateDialog(props: ICreateDialogProps) {
  const createCard = api.cards.createCard.useMutation({
    onSuccess: props.onClose,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      link: "",
      description: "",
      color: "#000000",
    },
  });

  const previewName = form.watch("name");
  const previewLink = form.watch("link");
  const previewDescription = form.watch("description");
  const previewColor = form.watch("color");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    await createCard.mutateAsync(values);
    form.reset();
  }

  return (
    <DialogContent className="sm:max-w-2xl">
      <DialogHeader>
        <DialogTitle>Create new card</DialogTitle>
        <DialogDescription>
          Create a new card and add it to your board.
        </DialogDescription>
      </DialogHeader>
      <Form {...form}>
        {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-8">
            <div className="flex gap-4">
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
                      Choose a name and color for your card.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={placeholders.color}
                        {...field}
                        type="color"
                        className="aspect-square w-12"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="link"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Link</FormLabel>
                  <FormControl>
                    <Input placeholder={placeholders.link} {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter the URL that your card should link to. Must begin with
                    https:// or http://
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
                    Enter a description for your card.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mt-8">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Preview
            </label>
            <div className="flex w-full justify-center">
              <Card
                card={{
                  name: previewName || placeholders.name,
                  color: previewColor || placeholders.color,
                  link: previewLink || placeholders.link,
                  description: previewDescription || placeholders.description,
                }}
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create card</Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}

export default CreateDialog;
