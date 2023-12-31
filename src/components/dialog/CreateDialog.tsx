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
import Card from "../LinkCard";
import { api } from "@/utils/api";
import IconPickerInput from "../IconPicker";

const formSchema = z.object({
  name: z.string().nonempty("Please enter a name"),
  link: z
    .string()
    .url("Please enter a valid URL")
    .nonempty("Please enter a link"),
  description: z.string().optional(),
  icon: z.string().nonempty("Please select an icon"),
  iconColor: z
    .string()
    .regex(/^#[0-9a-f]{6}$/i, "Please enter a valid color")
    .nonempty("Please select a color for the icon"),
  backgroundColor: z
    .string()
    .regex(/^#[0-9a-f]{6}$/i, "Please enter a valid color")
    .nonempty("Please select a background color for the card"),
});

const placeholders = {
  name: "IETF Foundation",
  link: "https://ietf.org",
  description:
    "The Internet Engineering Task Force is a non-profit standards organization.",
  icon: "user",
  iconColor: "#008CB4",
  backgroundColor: "#53D5FD",
};

interface ICreateDialogProps {
  onClose: () => void;
  dashboard: string;
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
      icon: placeholders.icon,
      iconColor: placeholders.iconColor,
      backgroundColor: placeholders.backgroundColor,
    },
  });

  const previewName = form.watch("name");
  const previewLink = form.watch("link");
  const previewDescription = form.watch("description");
  const previewIcon = form.watch("icon");
  const previewIconColor = form.watch("iconColor");
  const previewBackgroundColor = form.watch("backgroundColor");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    await createCard.mutateAsync({ ...values, dashboard: props.dashboard });
    console.log(props.dashboard);
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
            <div className="grid grid-cols-2 gap-8">
              <div className="grid grid-rows-3">
                <FormField
                  control={form.control}
                  name="iconColor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Icon Color</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={placeholders.iconColor}
                          {...field}
                          type="color"
                          className="h-16 w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="backgroundColor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Background Color</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={placeholders.backgroundColor}
                          {...field}
                          type="color"
                          className="h-16 w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="icon"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Icon</FormLabel>
                      <FormControl>
                        <IconPickerInput
                          placeholder={placeholders.icon}
                          changeIcon={(value: string) =>
                            form.setValue("icon", value)
                          }
                          value={field.value}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-8">
                <div className="flex w-full justify-center">
                  <Card
                    card={{
                      id: "preview",
                      name: previewName || placeholders.name,
                      iconColor: previewIconColor || placeholders.iconColor,
                      backgroundColor:
                        previewBackgroundColor || placeholders.backgroundColor,
                      link: previewLink || placeholders.link,
                      icon: previewIcon || placeholders.icon,
                      description:
                        previewDescription || placeholders.description,
                    }}
                  />
                </div>
              </div>
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
