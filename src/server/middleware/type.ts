import type { RequestHandler } from "express";
import type { Country } from "../../constants/countries";
import type { CountryState } from "./country";
import type { Manifest } from "../utils/render";
import type { QueryClient } from "@tanstack/react-query";
import type { NewsDataService } from "../api/newsdata";
import type { NavBarState } from "./navBar";

export interface AppLocals extends CountryState, NavBarState {
    manifest: Manifest;
    clientAssetPath: string;
    serverAssetPath: string;
    queryClient: QueryClient;
    newsDataService: NewsDataService;
}

export type Middleware<T = {}> = RequestHandler<
    unknown,
    string,
    unknown,
    {
        country?: Country | string;
    } & T,
    AppLocals
>;

export type Controller<T = {}> = RequestHandler<
    unknown,
    string,
    unknown,
    {
        country: Country;
    } & T,
    AppLocals
>;
