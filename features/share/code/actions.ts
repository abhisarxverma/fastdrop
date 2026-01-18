"use server";

import { codeShareService } from "@/services/share-service";
import { shareAction } from "../common/actions";
import { CodeShareActionSchema } from "./validation";

export const codeShareAction = shareAction(CodeShareActionSchema, codeShareService)