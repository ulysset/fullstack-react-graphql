export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Upload: any;
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}

export type Coronavirus = {
   __typename?: 'Coronavirus';
  iso3?: Maybe<Scalars['String']>;
  deaths?: Maybe<Scalars['Int']>;
  confirmed?: Maybe<Scalars['Int']>;
  recovered?: Maybe<Scalars['Int']>;
};

export type Country = {
   __typename?: 'Country';
  name?: Maybe<Scalars['String']>;
  iso2?: Maybe<Scalars['String']>;
  iso3?: Maybe<Scalars['String']>;
};

export type Query = {
   __typename?: 'Query';
  hello?: Maybe<Scalars['String']>;
  countries: Array<Maybe<Country>>;
  coronavirus: Coronavirus;
};


export type QueryCoronavirusArgs = {
  iso3: Scalars['String'];
};


export type GetCountriesQueryVariables = {};


export type GetCountriesQuery = (
  { __typename?: 'Query' }
  & { countries: Array<Maybe<(
    { __typename?: 'Country' }
    & Pick<Country, 'name' | 'iso3'>
  )>> }
);

export type GetCoronavirusDataQueryVariables = {
  iso3: Scalars['String'];
};


export type GetCoronavirusDataQuery = (
  { __typename?: 'Query' }
  & { coronavirus: (
    { __typename?: 'Coronavirus' }
    & Pick<Coronavirus, 'iso3' | 'deaths' | 'confirmed' | 'recovered'>
  ) }
);
