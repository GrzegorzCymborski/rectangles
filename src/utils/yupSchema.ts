import * as yup from 'yup';

export const dataSchema = yup.object().shape({
  id: yup.string().required(),
  project: yup.object({
    id: yup.string().required(),
    name: yup.string().required(),
    width: yup.number().required(),
    height: yup.number().required(),
    items: yup.array().of(
      yup.object().shape({
        id: yup.string().required(),
        color: yup.string().required(),
        rotation: yup.number().required(),
        x: yup.number().required(),
        y: yup.number().required(),
        width: yup.number().required(),
        height: yup.number().required(),
      }),
    ),
  }),
});
