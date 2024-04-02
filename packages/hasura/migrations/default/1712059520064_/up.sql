SET check_function_bodies = false;
CREATE TYPE public."groupServiceAccountTokenPriority" AS ENUM (
    'primary',
    'secondary'
);
CREATE TABLE public.contracts (
    "groupId" uuid NOT NULL,
    "planCode" text NOT NULL,
    "maxUsers" bigint NOT NULL,
    "startAt" timestamp with time zone NOT NULL,
    "expireAt" timestamp with time zone NOT NULL
);
CREATE FUNCTION public."contractsExpirationRemainingSeconds"(public.contracts) RETURNS double precision
    LANGUAGE sql STABLE
    AS $_$
  SELECT (EXTRACT ('epoch' FROM $1."expireAt" - CURRENT_TIMESTAMP))::float8
$_$;
CREATE TABLE public."groupTypeAssignments" (
    "groupId" uuid NOT NULL,
    "groupTypeCode" text NOT NULL
);
CREATE TABLE public."groupTypeTranslations" (
    "groupTypeCode" text NOT NULL,
    "languageCode" text NOT NULL,
    text text NOT NULL
);
CREATE TABLE public."groupTypes" (
    code text NOT NULL
);
CREATE TABLE public.groups (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    name text NOT NULL
);
CREATE TABLE public.languages (
    code text NOT NULL
);
CREATE TABLE public.memberships (
    "groupId" uuid NOT NULL,
    "userId" uuid DEFAULT gen_random_uuid() NOT NULL
);
CREATE TABLE public.ownerships (
    "userId" uuid NOT NULL,
    "groupId" uuid NOT NULL
);
CREATE TABLE public."planTranslations" (
    "planCode" text NOT NULL,
    "languageCode" text NOT NULL,
    text text NOT NULL
);
CREATE TABLE public.plans (
    code text NOT NULL
);
CREATE TABLE public.users (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    uid text NOT NULL,
    email text NOT NULL,
    name text NOT NULL
);
ALTER TABLE ONLY public.contracts
    ADD CONSTRAINT contracts_pkey PRIMARY KEY ("groupId");
ALTER TABLE ONLY public."groupTypeAssignments"
    ADD CONSTRAINT "groupTypeAssignments_pkey" PRIMARY KEY ("groupId");
ALTER TABLE ONLY public."groupTypeTranslations"
    ADD CONSTRAINT "groupTypeTranslations_pkey" PRIMARY KEY ("groupTypeCode", "languageCode");
ALTER TABLE ONLY public."groupTypes"
    ADD CONSTRAINT "groupTypes_pkey" PRIMARY KEY (code);
ALTER TABLE ONLY public.groups
    ADD CONSTRAINT groups_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.languages
    ADD CONSTRAINT languages_code PRIMARY KEY (code);
ALTER TABLE ONLY public.memberships
    ADD CONSTRAINT memberships_pkey PRIMARY KEY ("userId", "groupId");
ALTER TABLE ONLY public.ownerships
    ADD CONSTRAINT ownerships_pkey PRIMARY KEY ("userId", "groupId");
ALTER TABLE ONLY public."planTranslations"
    ADD CONSTRAINT "planTranslations_pkey" PRIMARY KEY ("planCode", "languageCode");
ALTER TABLE ONLY public.plans
    ADD CONSTRAINT plans_pkey PRIMARY KEY (code);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_uniqueness UNIQUE (email);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_uid_uniqueness UNIQUE (uid);
CREATE INDEX "contracts_groupId_planCode_idx" ON public.contracts USING btree ("groupId", "planCode");
CREATE INDEX "contracts_planCode_groupId_idx" ON public.contracts USING btree ("planCode", "groupId");
CREATE INDEX "groupTypeAssignments_groupId_groupTypeCode_idx" ON public."groupTypeAssignments" USING btree ("groupId", "groupTypeCode");
CREATE INDEX "groupTypeAssignments_groupTypeCode_groupId_idx" ON public."groupTypeAssignments" USING btree ("groupTypeCode", "groupId");
CREATE INDEX "memberships_groupId_idx" ON public.memberships USING btree ("groupId");
ALTER TABLE ONLY public.contracts
    ADD CONSTRAINT contracts_group_fkey FOREIGN KEY ("groupId") REFERENCES public.groups(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.contracts
    ADD CONSTRAINT "contracts_planCode_fkey" FOREIGN KEY ("planCode") REFERENCES public.plans(code) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public."groupTypeAssignments"
    ADD CONSTRAINT "groupTypeAssignments_groupTypeCode_fkey" FOREIGN KEY ("groupTypeCode") REFERENCES public."groupTypes"(code) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public."groupTypeAssignments"
    ADD CONSTRAINT "groupTypeAssignments_group_fkey" FOREIGN KEY ("groupId") REFERENCES public.groups(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public."groupTypeTranslations"
    ADD CONSTRAINT "groupTypeTranslations_groupTypeCode_fkey" FOREIGN KEY ("groupTypeCode") REFERENCES public."groupTypes"(code) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public."groupTypeTranslations"
    ADD CONSTRAINT "groupTypeTranslations_languageCode_fkey" FOREIGN KEY ("languageCode") REFERENCES public.languages(code) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.memberships
    ADD CONSTRAINT "memberships_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES public.groups(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.ownerships
    ADD CONSTRAINT "ownerships_userId_groupId_fkey" FOREIGN KEY ("userId", "groupId") REFERENCES public.memberships("userId", "groupId") ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public."planTranslations"
    ADD CONSTRAINT "planTranslations_languageCode_fkey" FOREIGN KEY ("languageCode") REFERENCES public.languages(code) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public."planTranslations"
    ADD CONSTRAINT "planTranslations_planCode_fkey" FOREIGN KEY ("planCode") REFERENCES public.plans(code) ON UPDATE CASCADE ON DELETE CASCADE;
