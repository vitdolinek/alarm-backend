import { Request, Response } from "express";
import * as bcrypt from "bcrypt";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repository/User";

export class UserController {
  async create({ body }: Request, response: Response) {
    const userRepository = getCustomRepository(UserRepository);
    const userExists = await userRepository.findByEmail(body.email);
    if (userExists)
      return response.status(409).json({
        code: "EMAIL_ALREADY_REGISTERED",
        message: "User with this e-mail address already exists.",
      });

    return bcrypt.hash(body.password, 10, (error, hash) => {
      if (error) return response.status(500).json({ error });

      return userRepository
        .save({
          email: body.email,
          password: hash,
          code: Math.random().toString(36).substring(2, 15),
        })
        .then((user) => response.status(201).send(user));
    });
  }

  async login({ body }: Request, response: Response) {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findByEmail(body.email);

    if (!user)
      return response.status(404).json({
        code: "USER_DOES_NOT_EXIST",
        message: "User with this e-mail does not exist.",
      });

    return bcrypt.compare(body.password, user.password, (error, match) => {
      if (error) return response.status(500).json({ error });
      if (match) return response.status(200).json(user);

      return response.status(403).json({
        code: "PASSWORD_DOES_NOT_MATCH",
        message: "Incorrect e-mail or password.",
      });
    });
  }

  async setToken({ body }: Request, response: Response) {
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.findByEmail(body.email);

    if (!user)
      return response.status(404).json({
        code: "USER_DOES_NOT_EXIST",
        message: "User with this e-mail does not exist.",
      });

    return userRepository
      .update({ email: body.email }, { token: body.token })
      .then(() => response.status(200).json())
      .catch((e) =>
        response
          .status(409)
          .json({ code: "TOKEN_UPDATE_FAILED", message: "Token failed." })
      );
  }
}
