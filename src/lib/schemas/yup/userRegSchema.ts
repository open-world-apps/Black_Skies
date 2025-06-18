import { object, string, ref } from 'yup';
import isEmail from 'validator/lib/isEmail';

const userRegSchema = object().shape({
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
    .min(5, 'Must be at least 5 characters.')
    .max(30, 'Cannot contain more than 30 characters.')
    .required('A username is required.'),
  password: string()
    .matches(
      /^(?!.*(?:012|123|234|345|456|567|678|789|987|876|765|654|543|432|321|210|(\d)\1{2}))(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!#^&])[A-Za-z\d@$#^!&]{8,}$/,
      'Invalid password'
    )
    .min(8, 'Must be at least 8 characters long')
    .required('A password is required.'),
  confirmPassword: string()
    .oneOf([ref('password')], 'Passwords must match.')
    .required('Password needs to be confirmed.'),
  email: string()
    .test(
      'is-valid',
      msg => `${msg.path} is invalid.`,
      val => isEmail(val!)
    )
    .required('Email is required.'),
});

export default userRegSchema;
