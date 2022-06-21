CREATE TABLE public.cliente (
    id integer NOT NULL,
    nome character varying(255) NOT NULL,
    email character varying(255) NOT NULL,
    empresa character varying(255),
    tlm integer,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    deleted_at timestamp with time zone
);

CREATE SEQUENCE public.cliente_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.cliente_id_seq OWNED BY public.cliente.id;

CREATE TABLE public.estado_pedido (
    id integer NOT NULL,
    descricao character varying(255) NOT NULL,
    icon character varying(255),
    cor character varying(255),
    obs character varying(255)
);

CREATE SEQUENCE public.estado_pedido_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.estado_pedido_id_seq OWNED BY public.estado_pedido.id;

CREATE TABLE public.formulario (
    id integer NOT NULL,
    titulo character varying(255) NOT NULL,
    descricao character varying(255),
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    deleted_at timestamp with time zone
);

CREATE SEQUENCE public.formulario_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.formulario_id_seq OWNED BY public.formulario.id;

CREATE TABLE public.grupo (
    id integer NOT NULL,
    titulo character varying(255) NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    deleted_at timestamp with time zone,
    formulario_id integer NOT NULL
);

CREATE SEQUENCE public.grupo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.grupo_id_seq OWNED BY public.grupo.id;

CREATE TABLE public.motivo_recusa_pedido (
    id integer NOT NULL,
    descricao character varying(255) NOT NULL,
    obs character varying(255)
);

CREATE SEQUENCE public.motivo_recusa_pedido_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.motivo_recusa_pedido_id_seq OWNED BY public.motivo_recusa_pedido.id;

CREATE TABLE public.pedido (
    id integer NOT NULL,
    valor_total double precision NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    deleted_at timestamp with time zone,
    cliente_id integer NOT NULL,
    estado_id integer NOT NULL,
    motivo_id integer
);

CREATE SEQUENCE public.pedido_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.pedido_id_seq OWNED BY public.pedido.id;

CREATE TABLE public.pergunta (
    id integer NOT NULL,
    titulo character varying(255) NOT NULL,
    descricao character varying(255),
    valor_unitario double precision NOT NULL,
    created_at timestamp with time zone NOT NULL,
    updated_at timestamp with time zone NOT NULL,
    deleted_at timestamp with time zone,
    grupo_id integer,
    tipo_id integer NOT NULL
);

CREATE SEQUENCE public.pergunta_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.pergunta_id_seq OWNED BY public.pergunta.id;

CREATE TABLE public.resposta (
    id integer NOT NULL,
    texto character varying(255),
    inteiro integer,
    valor_unitario double precision NOT NULL,
    pedido_id integer NOT NULL,
    pergunta_id integer NOT NULL
);

CREATE SEQUENCE public.resposta_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.resposta_id_seq OWNED BY public.resposta.id;

CREATE TABLE public.tipo_pergunta (
    id integer NOT NULL,
    titulo character varying(255) NOT NULL,
    obs character varying(255)
);

CREATE SEQUENCE public.tipo_pergunta_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.tipo_pergunta_id_seq OWNED BY public.tipo_pergunta.id;

CREATE TABLE public.user_incommun (
    id integer NOT NULL,
    username character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    role_id integer NOT NULL
);

CREATE SEQUENCE public.user_incommun_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.user_incommun_id_seq OWNED BY public.user_incommun.id;

CREATE TABLE public.user_incommun_role (
    id integer NOT NULL,
    descricao character varying(255) NOT NULL,
    obs character varying(255)
);

CREATE SEQUENCE public.user_incommun_role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.user_incommun_role_id_seq OWNED BY public.user_incommun_role.id;

ALTER TABLE ONLY public.cliente ALTER COLUMN id SET DEFAULT nextval('public.cliente_id_seq'::regclass);

ALTER TABLE ONLY public.estado_pedido ALTER COLUMN id SET DEFAULT nextval('public.estado_pedido_id_seq'::regclass);

ALTER TABLE ONLY public.formulario ALTER COLUMN id SET DEFAULT nextval('public.formulario_id_seq'::regclass);

ALTER TABLE ONLY public.grupo ALTER COLUMN id SET DEFAULT nextval('public.grupo_id_seq'::regclass);

ALTER TABLE ONLY public.motivo_recusa_pedido ALTER COLUMN id SET DEFAULT nextval('public.motivo_recusa_pedido_id_seq'::regclass);

ALTER TABLE ONLY public.pedido ALTER COLUMN id SET DEFAULT nextval('public.pedido_id_seq'::regclass);

ALTER TABLE ONLY public.pergunta ALTER COLUMN id SET DEFAULT nextval('public.pergunta_id_seq'::regclass);

ALTER TABLE ONLY public.resposta ALTER COLUMN id SET DEFAULT nextval('public.resposta_id_seq'::regclass);

ALTER TABLE ONLY public.tipo_pergunta ALTER COLUMN id SET DEFAULT nextval('public.tipo_pergunta_id_seq'::regclass);

ALTER TABLE ONLY public.user_incommun ALTER COLUMN id SET DEFAULT nextval('public.user_incommun_id_seq'::regclass);

ALTER TABLE ONLY public.user_incommun_role ALTER COLUMN id SET DEFAULT nextval('public.user_incommun_role_id_seq'::regclass);

ALTER TABLE ONLY public.cliente
    ADD CONSTRAINT cliente_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.estado_pedido
    ADD CONSTRAINT estado_pedido_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.formulario
    ADD CONSTRAINT formulario_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.grupo
    ADD CONSTRAINT grupo_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.motivo_recusa_pedido
    ADD CONSTRAINT motivo_recusa_pedido_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.pedido
    ADD CONSTRAINT pedido_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.pergunta
    ADD CONSTRAINT pergunta_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.resposta
    ADD CONSTRAINT resposta_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.tipo_pergunta
    ADD CONSTRAINT tipo_pergunta_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.user_incommun
    ADD CONSTRAINT user_incommun_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.user_incommun_role
    ADD CONSTRAINT user_incommun_role_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.grupo
    ADD CONSTRAINT grupo_formulario_id_fkey FOREIGN KEY (formulario_id) REFERENCES public.formulario(id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY public.pedido
    ADD CONSTRAINT pedido_cliente_id_fkey FOREIGN KEY (cliente_id) REFERENCES public.cliente(id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY public.pedido
    ADD CONSTRAINT pedido_estado_id_fkey FOREIGN KEY (estado_id) REFERENCES public.estado_pedido(id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY public.pedido
    ADD CONSTRAINT pedido_motivo_id_fkey FOREIGN KEY (motivo_id) REFERENCES public.motivo_recusa_pedido(id) ON UPDATE CASCADE ON DELETE SET NULL;

ALTER TABLE ONLY public.pergunta
    ADD CONSTRAINT pergunta_grupo_id_fkey FOREIGN KEY (grupo_id) REFERENCES public.grupo(id) ON UPDATE CASCADE ON DELETE SET NULL;

ALTER TABLE ONLY public.pergunta
    ADD CONSTRAINT pergunta_tipo_id_fkey FOREIGN KEY (tipo_id) REFERENCES public.tipo_pergunta(id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY public.resposta
    ADD CONSTRAINT resposta_pedido_id_fkey FOREIGN KEY (pedido_id) REFERENCES public.pedido(id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY public.resposta
    ADD CONSTRAINT resposta_pergunta_id_fkey FOREIGN KEY (pergunta_id) REFERENCES public.pergunta(id) ON UPDATE CASCADE ON DELETE CASCADE;

ALTER TABLE ONLY public.user_incommun
    ADD CONSTRAINT user_incommun_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.user_incommun_role(id) ON UPDATE CASCADE ON DELETE CASCADE;