import { object, string, TypeOf } from 'zod';

/**
 * @openapi
 * components:
 *  schemas:
 *    GetUserInput:
 *      type: object
 *      required:
 *        - firstName
 *        - surName
 *        - email
 *      properties:
 *        firstName:
 *          type: string
 *          default: Jane
 *        surName:
 *          type: string
 *          default: Doe
 *        email:
 *          type: string
 *          default: jane.doe@example.com
 *    GetUserResponse:
 *      type: object
 *      properties:
 *        firstName:
 *          type: string
 *        surName:
 *          type: string
 *        email:
 *          type: string
 *        _id:
 *          type: string
 *        telephone:
 *          type: string
 *        country:
 *          type: string
 *        createdAt:
 *          type: string
 *        updatedAt:
 *          type: string
 */

export const getUserSchema = object({
  body: object({
    firstName: string({
      required_error: 'Name is required',
    })
      .min(2, 'First name too short - should be 2 chars minimum')
      .max(20, 'First name too long - should be 20 chars maximum'),
    surName: string({
      required_error: 'Surname is required',
    })
      .min(2, 'Surname too short - should be 2 chars minimum')
      .max(20, 'Surname too long - should be 20 chars maximum'),
    email: string({
      required_error: 'Email is required',
    }).email('Not a valid email'),
  }),
});

export type GetUserInput = Omit<TypeOf<typeof getUserSchema>, 'body.passwordConfirmation'>;
