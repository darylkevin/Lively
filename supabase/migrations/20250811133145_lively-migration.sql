CREATE TABLE ip_api_usage (
    id SERIAL PRIMARY KEY,
    ip VARCHAR(45) NOT NULL,
    total_chars INT NOT NULL DEFAULT 0,
    last_request_day DATE NOT NULL,
    updated TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_ip_date_constraint UNIQUE (ip, last_request_day)
);

CREATE TABLE global_api_usage (
    id SERIAL PRIMARY KEY,
    total_chars INT NOT NULL DEFAULT 0,
    last_request_day DATE NOT NULL,
    updated TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT unique_date_constraint UNIQUE (last_request_day)
);

CREATE TABLE logs (
    id SERIAL PRIMARY KEY,
    time TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    last_request_day DATE NOT NULL,
    level VARCHAR(10) NOT NULL,
    message TEXT NOT NULL,
    ip VARCHAR(45) NOT NULL,
    requested_chars INT NOT NULL,
    remaining_global INT NOT NULL,
    remaining_local INT NOT NULL
);

CREATE TABLE feedbacks (
    id SERIAL PRIMARY KEY,
    feedback TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_ip_last_request_day ON ip_api_usage (ip, last_request_day);
CREATE INDEX idx_global_last_request_day ON global_api_usage (last_request_day);

ALTER TABLE public.ip_api_usage ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Deny ALL access" ON public.ip_api_usage
    FOR ALL
    USING (false)
    WITH CHECK (false);

ALTER TABLE public.global_api_usage ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Deny ALL access" ON public.global_api_usage
    FOR ALL
    USING (false)
    WITH CHECK (false);

ALTER TABLE public.logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Deny ALL access" ON public.logs
    FOR ALL
    USING (false)
    WITH CHECK (false);

ALTER TABLE public.feedbacks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Deny ALL access" ON public.feedbacks
    FOR ALL
    USING (false)
    WITH CHECK (false);
