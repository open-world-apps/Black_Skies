import isEmail from "validator/lib/isEmail";
import { object, string } from "yup"

const signInSchema = object().shape({
  username: string()
      .test(
        'not-an-email',
        msg => `${msg.path} should not be an email.`,
        val => !isEmail(val!)
      )
      .matches(
        /^[\w\d]{5,30}$/,
        'Usernames should be Alphanumeric can only contain underscores.'
      )
    .required('A username is required.'),
  password: string().required('Password must be filled.')
});

export default signInSchema;
