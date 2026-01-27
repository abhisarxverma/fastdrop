"use server";

import { createCodeShare } from "../common/services";
import { shareAction } from "../common/actions";
import { CodeShareActionSchema } from "./validation";

export const codeShareAction = shareAction(CodeShareActionSchema, createCodeShare)