import * as bcrypt from 'bcrypt';

export class Crypto {
  static async hashPassword(
    plainPassword: string,
  ): Promise<{ hash: string; salt: string }> {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(plainPassword, salt);
    return { salt, hash };
  }

  static async comparePassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
