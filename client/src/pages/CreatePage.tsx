import { Layout } from "../common/Layout";
import { UserForm } from "../comp/CreateForm/UserForm";
import { useCreateUser } from "../query/useUser";

export const CreatePage = () => {
  const { mutate } = useCreateUser();

  return (
    <Layout>
      <UserForm
        submitUser={(user) => {
          mutate(user);
        }}
      />
    </Layout>
  );
};
