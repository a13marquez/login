import { GenericFormGroup } from "./Form.model";

export type User = {
  firstName: string;
  lastName: string;
  email: string;
}

export type NewUSer = User & {
  password: string;
}

export type UserFormGroup = GenericFormGroup<NewUSer>;
