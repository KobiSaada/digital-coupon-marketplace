import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsImageUrl(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isImageUrl',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== 'string') {
            return false;
          }

          // Check if it's a valid URL
          try {
            new URL(value);
            return true;
          } catch {
            // Not a URL, check if it's a valid Data URI
            const dataUriPattern = /^data:image\/(jpeg|jpg|png|gif|webp|svg\+xml);base64,/i;
            return dataUriPattern.test(value);
          }
        },
        defaultMessage(args: ValidationArguments) {
          return 'imageUrl must be a valid URL or Data URI (data:image/jpeg;base64,...)';
        },
      },
    });
  };
}
