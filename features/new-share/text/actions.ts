"use server";

import { createTextShare } from "../common/services";
import { TextShareActionSchema } from "./validations";
import { shareAction } from "../common/actions";

export const textShareAction = shareAction(TextShareActionSchema, createTextShare)