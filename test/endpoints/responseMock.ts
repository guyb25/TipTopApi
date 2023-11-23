import { Response } from "express";

export const responseMock = {
    status: jest.fn().mockReturnThis(),
    json: jest.fn(),
} as any as Response