"use server";

import { createFileShare } from "../common/services";
import { shareAction } from "../common/actions";
import { FileShareActionSchema } from "./validations";

export const fileShareAction = shareAction(FileShareActionSchema, createFileShare)