import * as yup from 'yup';

export const signUpSchema = yup.object({
  Name: yup.string().min(3).max(20).required('Please Enter Your Name'),
  Contact: yup.number().min(10).required('Please Enter Your Contact Number'),
  Email: yup.string().email().required('Please Enter Your Email'),
  agree: yup.string().required('This field is required'),
});
