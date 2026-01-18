"use server";

import { textShareService } from "@/services/share-service";
import { TextShareActionSchema } from "./validations";
import { shareAction } from "../common/actions";

export const textShareAction = shareAction(TextShareActionSchema, textShareService)