--
-- PostgreSQL database dump
--

-- Dumped from database version 16.5
-- Dumped by pg_dump version 16.2

-- Started on 2024-11-21 14:00:23

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 215 (class 1259 OID 16568)
-- Name: cardetails; Type: TABLE; Schema: public; Owner: default
--

CREATE TABLE public.cardetails (
    serialnum integer NOT NULL,
    registernumber character varying(10) NOT NULL,
    carname text,
    carmake text,
    carcompany text,
    carcolor text,
    vehiclebuyprice numeric,
    fuel text,
    status boolean DEFAULT false,
    vehiclesellprice numeric
);


ALTER TABLE public.cardetails OWNER TO "default";

--
-- TOC entry 216 (class 1259 OID 16574)
-- Name: cardetails_serialnum_seq; Type: SEQUENCE; Schema: public; Owner: default
--

CREATE SEQUENCE public.cardetails_serialnum_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cardetails_serialnum_seq OWNER TO "default";

--
-- TOC entry 3443 (class 0 OID 0)
-- Dependencies: 216
-- Name: cardetails_serialnum_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: default
--

ALTER SEQUENCE public.cardetails_serialnum_seq OWNED BY public.cardetails.serialnum;


--
-- TOC entry 217 (class 1259 OID 16575)
-- Name: carinsurance; Type: TABLE; Schema: public; Owner: default
--

CREATE TABLE public.carinsurance (
    serialnum integer NOT NULL,
    registernumber character varying(10),
    insurancecompany text,
    insurancenumber text,
    insurancetenure integer,
    insurancestartdate date,
    insuranceenddate date,
    soldstatus boolean
);


ALTER TABLE public.carinsurance OWNER TO "default";

--
-- TOC entry 218 (class 1259 OID 16580)
-- Name: carinsurance_serialnum_seq; Type: SEQUENCE; Schema: public; Owner: default
--

CREATE SEQUENCE public.carinsurance_serialnum_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.carinsurance_serialnum_seq OWNER TO "default";

--
-- TOC entry 3444 (class 0 OID 0)
-- Dependencies: 218
-- Name: carinsurance_serialnum_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: default
--

ALTER SEQUENCE public.carinsurance_serialnum_seq OWNED BY public.carinsurance.serialnum;


--
-- TOC entry 219 (class 1259 OID 16581)
-- Name: customerquery; Type: TABLE; Schema: public; Owner: default
--

CREATE TABLE public.customerquery (
    serialnum integer NOT NULL,
    custname text,
    custcontact character varying(10) NOT NULL,
    custquery text,
    enquirydate text DEFAULT to_char(now(), 'MM/DD/YYYY HH12:MI:SS AM'::text)
);


ALTER TABLE public.customerquery OWNER TO "default";

--
-- TOC entry 220 (class 1259 OID 16587)
-- Name: customerquery_serialnum_seq; Type: SEQUENCE; Schema: public; Owner: default
--

CREATE SEQUENCE public.customerquery_serialnum_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.customerquery_serialnum_seq OWNER TO "default";

--
-- TOC entry 3445 (class 0 OID 0)
-- Dependencies: 220
-- Name: customerquery_serialnum_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: default
--

ALTER SEQUENCE public.customerquery_serialnum_seq OWNED BY public.customerquery.serialnum;


--
-- TOC entry 234 (class 1259 OID 40961)
-- Name: imagedescription; Type: TABLE; Schema: public; Owner: default
--

CREATE TABLE public.imagedescription (
    serialnum integer NOT NULL,
    uniqueid text NOT NULL,
    description text
);


ALTER TABLE public.imagedescription OWNER TO "default";

--
-- TOC entry 233 (class 1259 OID 40960)
-- Name: imagedescription_serialnum_seq; Type: SEQUENCE; Schema: public; Owner: default
--

CREATE SEQUENCE public.imagedescription_serialnum_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.imagedescription_serialnum_seq OWNER TO "default";

--
-- TOC entry 3446 (class 0 OID 0)
-- Dependencies: 233
-- Name: imagedescription_serialnum_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: default
--

ALTER SEQUENCE public.imagedescription_serialnum_seq OWNED BY public.imagedescription.serialnum;


--
-- TOC entry 221 (class 1259 OID 16588)
-- Name: installments; Type: TABLE; Schema: public; Owner: default
--

CREATE TABLE public.installments (
    id integer NOT NULL,
    registernumber character varying(10) NOT NULL,
    amount numeric(10,2) NOT NULL,
    installment_date date NOT NULL,
    total_amount numeric(10,2) DEFAULT 0,
    description text,
    payment_mode text,
    account_paid_to text
);


ALTER TABLE public.installments OWNER TO "default";

--
-- TOC entry 222 (class 1259 OID 16593)
-- Name: installments_id_seq; Type: SEQUENCE; Schema: public; Owner: default
--

CREATE SEQUENCE public.installments_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.installments_id_seq OWNER TO "default";

--
-- TOC entry 3447 (class 0 OID 0)
-- Dependencies: 222
-- Name: installments_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: default
--

ALTER SEQUENCE public.installments_id_seq OWNED BY public.installments.id;


--
-- TOC entry 236 (class 1259 OID 65549)
-- Name: investment; Type: TABLE; Schema: public; Owner: default
--

CREATE TABLE public.investment (
    serial_number integer NOT NULL,
    amount numeric(15,2) DEFAULT 0 NOT NULL,
    description text,
    date timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.investment OWNER TO "default";

--
-- TOC entry 235 (class 1259 OID 65548)
-- Name: investment_serial_number_seq; Type: SEQUENCE; Schema: public; Owner: default
--

CREATE SEQUENCE public.investment_serial_number_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.investment_serial_number_seq OWNER TO "default";

--
-- TOC entry 3448 (class 0 OID 0)
-- Dependencies: 235
-- Name: investment_serial_number_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: default
--

ALTER SEQUENCE public.investment_serial_number_seq OWNED BY public.investment.serial_number;


--
-- TOC entry 223 (class 1259 OID 16594)
-- Name: maintainancedetails; Type: TABLE; Schema: public; Owner: default
--

CREATE TABLE public.maintainancedetails (
    serialnum integer NOT NULL,
    registernumber character varying(10),
    maintainancecost integer,
    maintainancedetails text,
    maintainancedate date,
    maintainancedone text,
    maintainancenumber integer
);


ALTER TABLE public.maintainancedetails OWNER TO "default";

--
-- TOC entry 224 (class 1259 OID 16599)
-- Name: maintainancedetails_serialnum_seq; Type: SEQUENCE; Schema: public; Owner: default
--

CREATE SEQUENCE public.maintainancedetails_serialnum_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.maintainancedetails_serialnum_seq OWNER TO "default";

--
-- TOC entry 3449 (class 0 OID 0)
-- Dependencies: 224
-- Name: maintainancedetails_serialnum_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: default
--

ALTER SEQUENCE public.maintainancedetails_serialnum_seq OWNED BY public.maintainancedetails.serialnum;


--
-- TOC entry 232 (class 1259 OID 32769)
-- Name: miscellaneous_costs; Type: TABLE; Schema: public; Owner: default
--

CREATE TABLE public.miscellaneous_costs (
    id integer NOT NULL,
    cost numeric(10,2) NOT NULL,
    description text NOT NULL,
    date date NOT NULL
);


ALTER TABLE public.miscellaneous_costs OWNER TO "default";

--
-- TOC entry 231 (class 1259 OID 32768)
-- Name: miscellaneous_costs_id_seq; Type: SEQUENCE; Schema: public; Owner: default
--

CREATE SEQUENCE public.miscellaneous_costs_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.miscellaneous_costs_id_seq OWNER TO "default";

--
-- TOC entry 3450 (class 0 OID 0)
-- Dependencies: 231
-- Name: miscellaneous_costs_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: default
--

ALTER SEQUENCE public.miscellaneous_costs_id_seq OWNED BY public.miscellaneous_costs.id;


--
-- TOC entry 225 (class 1259 OID 16600)
-- Name: ownerdetails; Type: TABLE; Schema: public; Owner: default
--

CREATE TABLE public.ownerdetails (
    serialnum integer NOT NULL,
    ownername text,
    ownerphone character varying(10),
    owneremail text,
    owneraddress text,
    registernumber character varying(10)
);


ALTER TABLE public.ownerdetails OWNER TO "default";

--
-- TOC entry 226 (class 1259 OID 16605)
-- Name: ownerdetails_serialnum_seq; Type: SEQUENCE; Schema: public; Owner: default
--

CREATE SEQUENCE public.ownerdetails_serialnum_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ownerdetails_serialnum_seq OWNER TO "default";

--
-- TOC entry 3451 (class 0 OID 0)
-- Dependencies: 226
-- Name: ownerdetails_serialnum_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: default
--

ALTER SEQUENCE public.ownerdetails_serialnum_seq OWNED BY public.ownerdetails.serialnum;


--
-- TOC entry 227 (class 1259 OID 16606)
-- Name: soldcardetails; Type: TABLE; Schema: public; Owner: default
--

CREATE TABLE public.soldcardetails (
    serial_number integer NOT NULL,
    registernumber character varying(10),
    selling_price numeric(10,2),
    owner_name character varying(100),
    contact_no character varying(15),
    down_payment numeric(10,2),
    total_installments integer,
    installment_amount numeric(10,2),
    commission numeric(10,2),
    description text,
    payment_mode text,
    account_paid_to text
);


ALTER TABLE public.soldcardetails OWNER TO "default";

--
-- TOC entry 228 (class 1259 OID 16609)
-- Name: soldcardetails_serial_number_seq; Type: SEQUENCE; Schema: public; Owner: default
--

CREATE SEQUENCE public.soldcardetails_serial_number_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.soldcardetails_serial_number_seq OWNER TO "default";

--
-- TOC entry 3452 (class 0 OID 0)
-- Dependencies: 228
-- Name: soldcardetails_serial_number_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: default
--

ALTER SEQUENCE public.soldcardetails_serial_number_seq OWNED BY public.soldcardetails.serial_number;


--
-- TOC entry 229 (class 1259 OID 16610)
-- Name: users; Type: TABLE; Schema: public; Owner: default
--

CREATE TABLE public.users (
    serialnum integer NOT NULL,
    userid text NOT NULL,
    username text,
    userpassword text,
    userdesignation text
);


ALTER TABLE public.users OWNER TO "default";

--
-- TOC entry 230 (class 1259 OID 16615)
-- Name: users_serialnum_seq; Type: SEQUENCE; Schema: public; Owner: default
--

CREATE SEQUENCE public.users_serialnum_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_serialnum_seq OWNER TO "default";

--
-- TOC entry 3453 (class 0 OID 0)
-- Dependencies: 230
-- Name: users_serialnum_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: default
--

ALTER SEQUENCE public.users_serialnum_seq OWNED BY public.users.serialnum;


--
-- TOC entry 3230 (class 2604 OID 16616)
-- Name: cardetails serialnum; Type: DEFAULT; Schema: public; Owner: default
--

ALTER TABLE ONLY public.cardetails ALTER COLUMN serialnum SET DEFAULT nextval('public.cardetails_serialnum_seq'::regclass);


--
-- TOC entry 3232 (class 2604 OID 16617)
-- Name: carinsurance serialnum; Type: DEFAULT; Schema: public; Owner: default
--

ALTER TABLE ONLY public.carinsurance ALTER COLUMN serialnum SET DEFAULT nextval('public.carinsurance_serialnum_seq'::regclass);


--
-- TOC entry 3233 (class 2604 OID 16618)
-- Name: customerquery serialnum; Type: DEFAULT; Schema: public; Owner: default
--

ALTER TABLE ONLY public.customerquery ALTER COLUMN serialnum SET DEFAULT nextval('public.customerquery_serialnum_seq'::regclass);


--
-- TOC entry 3242 (class 2604 OID 40964)
-- Name: imagedescription serialnum; Type: DEFAULT; Schema: public; Owner: default
--

ALTER TABLE ONLY public.imagedescription ALTER COLUMN serialnum SET DEFAULT nextval('public.imagedescription_serialnum_seq'::regclass);


--
-- TOC entry 3235 (class 2604 OID 16619)
-- Name: installments id; Type: DEFAULT; Schema: public; Owner: default
--

ALTER TABLE ONLY public.installments ALTER COLUMN id SET DEFAULT nextval('public.installments_id_seq'::regclass);


--
-- TOC entry 3243 (class 2604 OID 65552)
-- Name: investment serial_number; Type: DEFAULT; Schema: public; Owner: default
--

ALTER TABLE ONLY public.investment ALTER COLUMN serial_number SET DEFAULT nextval('public.investment_serial_number_seq'::regclass);


--
-- TOC entry 3237 (class 2604 OID 16620)
-- Name: maintainancedetails serialnum; Type: DEFAULT; Schema: public; Owner: default
--

ALTER TABLE ONLY public.maintainancedetails ALTER COLUMN serialnum SET DEFAULT nextval('public.maintainancedetails_serialnum_seq'::regclass);


--
-- TOC entry 3241 (class 2604 OID 32772)
-- Name: miscellaneous_costs id; Type: DEFAULT; Schema: public; Owner: default
--

ALTER TABLE ONLY public.miscellaneous_costs ALTER COLUMN id SET DEFAULT nextval('public.miscellaneous_costs_id_seq'::regclass);


--
-- TOC entry 3238 (class 2604 OID 16621)
-- Name: ownerdetails serialnum; Type: DEFAULT; Schema: public; Owner: default
--

ALTER TABLE ONLY public.ownerdetails ALTER COLUMN serialnum SET DEFAULT nextval('public.ownerdetails_serialnum_seq'::regclass);


--
-- TOC entry 3239 (class 2604 OID 16622)
-- Name: soldcardetails serial_number; Type: DEFAULT; Schema: public; Owner: default
--

ALTER TABLE ONLY public.soldcardetails ALTER COLUMN serial_number SET DEFAULT nextval('public.soldcardetails_serial_number_seq'::regclass);


--
-- TOC entry 3240 (class 2604 OID 16623)
-- Name: users serialnum; Type: DEFAULT; Schema: public; Owner: default
--

ALTER TABLE ONLY public.users ALTER COLUMN serialnum SET DEFAULT nextval('public.users_serialnum_seq'::regclass);


--
-- TOC entry 3416 (class 0 OID 16568)
-- Dependencies: 215
-- Data for Name: cardetails; Type: TABLE DATA; Schema: public; Owner: default
--

COPY public.cardetails (serialnum, registernumber, carname, carmake, carcompany, carcolor, vehiclebuyprice, fuel, status, vehiclesellprice) FROM stdin;
37	MH19AB3452	Pulsar	bike	Honda	Yellow	20000	diesel	t	50000
35	MH19AB9876	PQR	bike	Honda	Yellow	40000	petrol	t	60000
44	MH12BB1111	Nano	car	Tata	red	100000	diesel	t	100000
42	MH12AB1243	City	car	Honda	White	4535	petrol	t	34535
31	MH12AB1234	vento	car	Volkswagen	White	250000	petrol	t	100005
32	MH12AB4321	Ape Plus 5-Seater	tempo	Piaggio	Red	40000	cng	t	80000
39	MH12PZ8067	Baleno	car	Maruti	white	800000	petrol	t	900000
34	MH11DD1459	ACE HIT	tempo	TATA	Off white	365000	petrol	t	550000
45	UP18AB4463	Current	car	Honda	Green	1000	diesel	t	2000
46	MH12PP1234	Scorpio	car	Mahindra	Red	1000000		f	1100000
47	MH12PQ1234	Curvv	car	Tata	red	1000000	petrol	f	1400000
\.


--
-- TOC entry 3418 (class 0 OID 16575)
-- Dependencies: 217
-- Data for Name: carinsurance; Type: TABLE DATA; Schema: public; Owner: default
--

COPY public.carinsurance (serialnum, registernumber, insurancecompany, insurancenumber, insurancetenure, insurancestartdate, insuranceenddate, soldstatus) FROM stdin;
19	MH12AB1234	HDFC	93579385	6	2024-11-02	2028-07-02	f
20	MH11DD1459	Bajaj	1234678	4	2024-11-06	2028-11-06	f
21	MH19AB9876	ABC000	123000	2	2024-11-05	2024-11-06	f
23	MH19AB3452	ABC000	123000	5	2024-11-05	2024-11-06	f
25	UP18AB4463	PBL-SEM-4	1324	1	2024-11-19	2024-11-20	f
\.


--
-- TOC entry 3420 (class 0 OID 16581)
-- Dependencies: 219
-- Data for Name: customerquery; Type: TABLE DATA; Schema: public; Owner: default
--

COPY public.customerquery (serialnum, custname, custcontact, custquery, enquirydate) FROM stdin;
6	smvvmkmf	9370686343	fflvmklmb	15/11/2024, 12:43:40 pm
8	hi	7559179362	hi\n	18/11/2024, 17:39:23
\.


--
-- TOC entry 3435 (class 0 OID 40961)
-- Dependencies: 234
-- Data for Name: imagedescription; Type: TABLE DATA; Schema: public; Owner: default
--

COPY public.imagedescription (serialnum, uniqueid, description) FROM stdin;
2	1731925514008	404!!!
3	1731926044742	srtt
4	1731927825508	
5	1731930877052	Just a bill
6	1731930971866	bill
7	1731931197704	
8	1731931298663	
9	1731931567642	frontend
10	1731931633654	Admin Frontend
11	1731931841421	lxdmb
12	1731932020345	zgsg
13	1731934959601	hello\n
14	1731935207466	desc
15	1731935233658	hi
16	1731951526426	test host\n
17	1732001081777	ss
\.


--
-- TOC entry 3422 (class 0 OID 16588)
-- Dependencies: 221
-- Data for Name: installments; Type: TABLE DATA; Schema: public; Owner: default
--

COPY public.installments (id, registernumber, amount, installment_date, total_amount, description, payment_mode, account_paid_to) FROM stdin;
42	MH12BB1111	1000.00	2024-11-18	11600.00	\N	\N	\N
48	MH12BB1111	4600.00	2024-11-19	11600.00	\N	\N	\N
49	MH12BB1111	3000.00	2024-11-19	11600.00	ndsvkjnskv	smdvnkjlsnb	zlsnbklsnb
6	MH12AB4321	10000.00	2024-11-02	14124.01	\N	\N	\N
7	MH12AB4321	4000.00	2024-11-02	14124.01	\N	\N	\N
8	MH12AB4321	100.00	2024-11-02	14124.01	\N	\N	\N
9	MH12AB4321	12.00	2024-11-29	14124.01	\N	\N	\N
10	MH12AB4321	12.00	2024-11-22	14124.01	\N	\N	\N
50	MH12AB4321	8000.00	2024-11-19	14124.01	klbk	dzfbkln	zklknbkzd
51	MH11DD1459	4000.00	2024-11-19	4000.02	ndfbnkng	ldgnkl	kznoh
52	MH11DD1459	7002.00	2024-11-19	4000.02	ndfbnkng	ldgnkl	kznoh
53	MH11DD1459	520.00	2024-11-19	4000.02	zklkl	mdbkl	kldfbj
54	UP18AB4463	6000.00	2024-11-19	6000.03	kjzdfbjp	kako	ehjaeh
40	MH12AB1234	1.00	2024-11-30	11.00	\N	\N	\N
11	MH12AB1234	10.00	2024-11-04	11.00	\N	\N	\N
12	MH12AB1234	5000.00	2024-11-05	11.00	\N	\N	\N
14	MH12AB1234	5000.00	2024-11-15	11.00	\N	\N	\N
33	MH12AB1234	100.00	2024-11-19	11.00	\N	\N	\N
55	UP18AB4463	6050.00	2024-11-19	6000.03	klndbvkozd	kjzdbdfogo	dzbfnklzdfnfbkj
56	UP18AB4463	5000.00	2024-11-19	6000.03	mdnbkldn	cnkdmn;	zd,b,zmn
57	UP18AB4463	500.00	2024-11-19	6000.03	rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr	ppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppppp	aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
59	UP18AB4463	10000.00	2024-11-19	6000.03	test	cash	abc
60	UP18AB4463	1000.00	2024-11-20	6000.03	kaaehfi	cash	gre
61	UP18AB4463	1000.00	2024-11-21	6000.03	oil	cash	abc
34	MH12AB1234	1.00	2024-11-18	11.00	\N	\N	\N
32	MH19AB3452	11.00	2024-12-06	21.00	\N	\N	\N
27	MH19AB3452	101.00	1111-11-11	136.00	\N	\N	\N
13	MH19AB3452	20000.00	2024-11-05	21401.00	\N	\N	\N
15	MH19AB3452	10.00	2024-11-16	1401.00	\N	\N	\N
16	MH19AB3452	1000.00	2024-11-16	1391.00	\N	\N	\N
17	MH19AB3452	5.00	2024-11-16	391.00	\N	\N	\N
19	MH19AB3452	100.00	2024-11-18	386.00	\N	\N	\N
21	MH19AB3452	1.00	2024-11-18	286.00	\N	\N	\N
22	MH19AB3452	10.00	2024-11-18	285.00	\N	\N	\N
23	MH19AB3452	10.00	2024-11-18	275.00	\N	\N	\N
24	MH19AB3452	100.00	2024-11-18	265.00	\N	\N	\N
25	MH19AB3452	19.00	2024-11-18	165.00	\N	\N	\N
26	MH19AB3452	10.00	2024-11-18	146.00	\N	\N	\N
28	MH19AB3452	11.00	2024-11-18	35.00	\N	\N	\N
35	MH12AB1234	1.00	2024-11-18	11.00	\N	\N	\N
29	MH19AB3452	1.00	2024-11-18	24.00	\N	\N	\N
30	MH19AB3452	1.00	2024-11-18	23.00	\N	\N	\N
31	MH19AB3452	1.00	2024-11-18	22.00	\N	\N	\N
43	MH19AB3452	10.00	2024-11-18	10.00	\N	\N	\N
18	MH19AB9876	10.00	2024-11-18	21.00	\N	\N	\N
20	MH19AB9876	1.00	2024-11-18	11.00	\N	\N	\N
44	MH19AB9876	10.00	2024-11-18	10.00	\N	\N	\N
36	MH12AB1234	1.00	2024-11-18	11.00	\N	\N	\N
37	MH12AB1234	1.00	2024-11-18	11.00	\N	\N	\N
38	MH12AB1234	1.00	2024-11-18	11.00	\N	\N	\N
45	MH12AB1243	10.00	2024-11-19	9010.00	\N	\N	\N
46	MH12AB1243	5000.00	2024-11-19	9000.00	\N	\N	\N
47	MH12AB1243	4000.00	2024-11-19	9010.00	\N	\N	\N
39	MH12AB1234	1.00	2024-11-18	11.00	\N	\N	\N
41	MH12AB1234	10.00	2024-11-18	11.00	\N	\N	\N
58	MH12AB1234	10000.00	2024-11-19	11.00	hi	cash	abc
\.


--
-- TOC entry 3437 (class 0 OID 65549)
-- Dependencies: 236
-- Data for Name: investment; Type: TABLE DATA; Schema: public; Owner: default
--

COPY public.investment (serial_number, amount, description, date) FROM stdin;
2	10000.00	First	2024-11-20 12:29:47.262763
3	5000.00	Second	2024-11-20 12:33:25.644
4	-5000.00	Corrected	2024-11-20 13:50:32.742
5	40000000.00	inv	2024-11-20 14:12:02.865
6	100.00	test	2024-11-21 07:45:49.842
\.


--
-- TOC entry 3424 (class 0 OID 16594)
-- Dependencies: 223
-- Data for Name: maintainancedetails; Type: TABLE DATA; Schema: public; Owner: default
--

COPY public.maintainancedetails (serialnum, registernumber, maintainancecost, maintainancedetails, maintainancedate, maintainancedone, maintainancenumber) FROM stdin;
19	MH12AB4321	1100	tyre change	2024-11-02	admin	1
20	MH12AB4321	1000	oil change	2024-11-02	driver	2
21	MH19AB3452	5000	Car paint	2024-11-05	driver	1
22	MH12AB4321	500	Chasis	2024-11-05	driver	3
23	MH12AB4321	2500	Polish	2024-11-06	admin	4
24	MH11DD1459	700	Driver maintainance	2024-11-12	driver	1
25	MH11DD1459	70000	Admin maintainance	2024-11-12	admin	2
28	MH11DD1459	500	kdkvn	2024-11-15	driver	3
29	MH12AB4321	10	hi	2024-11-16	admin	5
30	MH12AB4321	10	hi	2024-11-16	admin	6
31	MH12AB4321	10	hello	7437-03-07	admin	7
32	MH12AB4321	34	hofef	2024-11-16	admin	8
33	MH12AB4321	34	hofef	2024-11-16	admin	9
34	MH12AB4321	1	test	3434-02-11	admin	10
35	MH12AB4321	1	test1	1111-11-11	admin	11
36	MH12AB4321	1	test1	1111-11-11	admin	12
37	MH12AB4321	1	test1	1111-11-11	admin	13
38	MH12AB4321	1	test1	1111-11-11	admin	14
39	MH12PZ8067	1000	oil	2024-11-18	admin	1
40	MH11DD1459	10	hi	1111-11-11	driver	4
41	MH11DD1459	10	hi	1111-11-11	driver	5
42	MH12PZ8067	1000	testing purpose	2024-11-19	driver	2
43	MH12PZ8067	1000	tester	2024-11-19	driver	3
44	MH12PP1234	1000	tyre	2024-11-19	admin	1
45	MH12PQ1234	2000	oil	2024-11-19	admin	1
46	MH12PP1234	100	test\n	2024-11-21	admin	2
\.


--
-- TOC entry 3433 (class 0 OID 32769)
-- Dependencies: 232
-- Data for Name: miscellaneous_costs; Type: TABLE DATA; Schema: public; Owner: default
--

COPY public.miscellaneous_costs (id, cost, description, date) FROM stdin;
1	150.50	Office Supplies	2024-11-01
2	1000.00	hi	2024-11-17
3	10.00	hello	2024-11-17
4	1.00	a	2024-11-17
5	1.00	b	2024-11-17
6	1.00	c	2024-11-17
7	1.00	d	2024-11-17
8	1.00	e	2024-11-17
9	1.00	f	2024-11-17
10	10.00	hi	2024-11-17
11	150.50	Office Supplies	2024-12-01
12	100.00	after hosting	2024-11-17
13	100.00	hello	2024-11-18
14	10.00	hello	2024-11-18
15	4500.00	Abc	2024-11-18
\.


--
-- TOC entry 3426 (class 0 OID 16600)
-- Dependencies: 225
-- Data for Name: ownerdetails; Type: TABLE DATA; Schema: public; Owner: default
--

COPY public.ownerdetails (serialnum, ownername, ownerphone, owneremail, owneraddress, registernumber) FROM stdin;
30	Nikhil Motors	7058600679	nikhilmotors@gmail.com	Halondi, Kolhapur	MH12AB1234
31	Nikhil Motors	7058600679	nikhilmotors@gmail.com	Halondi, Kolhapur	MH12AB4321
33	Nikhil Motors	7058600679	nikhilmotors@gmail.com	Halondi, Kolhapur	MH11DD1459
34	Shounak	1234567890	shounakmulay04@gmail.com	PQR	MH19AB9876
36	Shounak	1234567890	shounakmulay04@gmail.com	PQR	MH19AB3452
38	Nikhil Motors	7058600679	nikhilmotors@gmail.com	Halondi, Kolhapur	MH12PZ8067
41	Nikhil Motors	7058600679	nikhilmotors@gmail.com	Halondi, Kolhapur	MH12AB1243
43	Nikhil Motors	7058600679	nikhilmotors@gmail.com	Halondi, Kolhapur	MH12BB1111
44	Ajay Nagar	9370686343	amolpatilamp2910@gmail.com	2475 B	UP18AB4463
45	Nikhil Motors	7058600679	nikhilmotors@gmail.com	Halondi, Kolhapur	MH12PP1234
46	Nikhil Motors	7058600679	nikhilmotors@gmail.com	Halondi, Kolhapur	MH12PQ1234
\.


--
-- TOC entry 3428 (class 0 OID 16606)
-- Dependencies: 227
-- Data for Name: soldcardetails; Type: TABLE DATA; Schema: public; Owner: default
--

COPY public.soldcardetails (serial_number, registernumber, selling_price, owner_name, contact_no, down_payment, total_installments, installment_amount, commission, description, payment_mode, account_paid_to) FROM stdin;
48	MH12AB4321	90000.00	shounak	7593850444	40000.00	3	2000.00	5000.00	\N	\N	\N
49	MH12AB1234	100000.00	shounak	7593850444	56.00	45	456.00	46.00	\N	\N	\N
50	MH12AB1234	100000.00	shounak	7593850444	50000.00	3	1000.00	5000.00	\N	\N	\N
51	MH19AB3452	100000.00	Ramesh	9370686343	50000.00	2	25000.00	5000.00	\N	\N	\N
52	MH19AB9876	100000.00	shounak	7593850444	10000.00	4	10000.00	5000.00	\N	\N	\N
53	MH12BB1111	120000.00	abc	7593850444	10000.00	5	5000.00	1000.00	\N	\N	\N
54	MH12AB1243	100000.00	abc	7593850444	10000.00	5	10000.00	50000.00	\N	\N	\N
55	MH12AB4321	75000.00	Ajay Nagar	9370686343	50000.00	5	5000.00	50000.00	\N	\N	\N
56	MH12PZ8067	5000000.00	Devendra	9370686343	1000000.00	4	100000.00	50000.00	\N	\N	\N
57	MH11DD1459	6000000.00	AP	9370686343	1000000.00	4	100000.00	50000.00	\N	\N	\N
58	UP18AB4463	6000000.00	AP	9370686343	1000000.00	4	100000.00	50000.00	first	shvoh	zndfbkl
\.


--
-- TOC entry 3430 (class 0 OID 16610)
-- Dependencies: 229
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: default
--

COPY public.users (serialnum, userid, username, userpassword, userdesignation) FROM stdin;
5	admin	admin	admin	Admin
6	driver	driver	driver	Driver
4	employee	employee	employee	Employee
8	driver1	driver1	driver1	Driver
12	driver3	driver3	driver3	Driver
15	driver4	driver4	driver4	Driver
16	driver5	driver5	driver5	Driver
17	employee1	employee1	employee1	Employee
18	emp	emp	emp	Employee
19	employee10	ajay patil	employee10	Employee
20	driver10	ramesh babu	driver10	Driver
21	dr	dr	dr	Driver
22	driv	driv	driv	Driver
\.


--
-- TOC entry 3454 (class 0 OID 0)
-- Dependencies: 216
-- Name: cardetails_serialnum_seq; Type: SEQUENCE SET; Schema: public; Owner: default
--

SELECT pg_catalog.setval('public.cardetails_serialnum_seq', 47, true);


--
-- TOC entry 3455 (class 0 OID 0)
-- Dependencies: 218
-- Name: carinsurance_serialnum_seq; Type: SEQUENCE SET; Schema: public; Owner: default
--

SELECT pg_catalog.setval('public.carinsurance_serialnum_seq', 25, true);


--
-- TOC entry 3456 (class 0 OID 0)
-- Dependencies: 220
-- Name: customerquery_serialnum_seq; Type: SEQUENCE SET; Schema: public; Owner: default
--

SELECT pg_catalog.setval('public.customerquery_serialnum_seq', 8, true);


--
-- TOC entry 3457 (class 0 OID 0)
-- Dependencies: 233
-- Name: imagedescription_serialnum_seq; Type: SEQUENCE SET; Schema: public; Owner: default
--

SELECT pg_catalog.setval('public.imagedescription_serialnum_seq', 17, true);


--
-- TOC entry 3458 (class 0 OID 0)
-- Dependencies: 222
-- Name: installments_id_seq; Type: SEQUENCE SET; Schema: public; Owner: default
--

SELECT pg_catalog.setval('public.installments_id_seq', 61, true);


--
-- TOC entry 3459 (class 0 OID 0)
-- Dependencies: 235
-- Name: investment_serial_number_seq; Type: SEQUENCE SET; Schema: public; Owner: default
--

SELECT pg_catalog.setval('public.investment_serial_number_seq', 6, true);


--
-- TOC entry 3460 (class 0 OID 0)
-- Dependencies: 224
-- Name: maintainancedetails_serialnum_seq; Type: SEQUENCE SET; Schema: public; Owner: default
--

SELECT pg_catalog.setval('public.maintainancedetails_serialnum_seq', 46, true);


--
-- TOC entry 3461 (class 0 OID 0)
-- Dependencies: 231
-- Name: miscellaneous_costs_id_seq; Type: SEQUENCE SET; Schema: public; Owner: default
--

SELECT pg_catalog.setval('public.miscellaneous_costs_id_seq', 15, true);


--
-- TOC entry 3462 (class 0 OID 0)
-- Dependencies: 226
-- Name: ownerdetails_serialnum_seq; Type: SEQUENCE SET; Schema: public; Owner: default
--

SELECT pg_catalog.setval('public.ownerdetails_serialnum_seq', 46, true);


--
-- TOC entry 3463 (class 0 OID 0)
-- Dependencies: 228
-- Name: soldcardetails_serial_number_seq; Type: SEQUENCE SET; Schema: public; Owner: default
--

SELECT pg_catalog.setval('public.soldcardetails_serial_number_seq', 58, true);


--
-- TOC entry 3464 (class 0 OID 0)
-- Dependencies: 230
-- Name: users_serialnum_seq; Type: SEQUENCE SET; Schema: public; Owner: default
--

SELECT pg_catalog.setval('public.users_serialnum_seq', 22, true);


--
-- TOC entry 3247 (class 2606 OID 16625)
-- Name: cardetails cardetails_pkey; Type: CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public.cardetails
    ADD CONSTRAINT cardetails_pkey PRIMARY KEY (registernumber);


--
-- TOC entry 3249 (class 2606 OID 16627)
-- Name: carinsurance carinsurance_pkey; Type: CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public.carinsurance
    ADD CONSTRAINT carinsurance_pkey PRIMARY KEY (serialnum);


--
-- TOC entry 3251 (class 2606 OID 16629)
-- Name: customerquery customerquery_pkey; Type: CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public.customerquery
    ADD CONSTRAINT customerquery_pkey PRIMARY KEY (serialnum, custcontact);


--
-- TOC entry 3263 (class 2606 OID 40968)
-- Name: imagedescription imagedescription_pkey; Type: CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public.imagedescription
    ADD CONSTRAINT imagedescription_pkey PRIMARY KEY (serialnum);


--
-- TOC entry 3265 (class 2606 OID 40970)
-- Name: imagedescription imagedescription_uniqueid_key; Type: CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public.imagedescription
    ADD CONSTRAINT imagedescription_uniqueid_key UNIQUE (uniqueid);


--
-- TOC entry 3253 (class 2606 OID 16631)
-- Name: installments installments_pkey; Type: CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public.installments
    ADD CONSTRAINT installments_pkey PRIMARY KEY (id);


--
-- TOC entry 3267 (class 2606 OID 65555)
-- Name: investment investment_pkey; Type: CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public.investment
    ADD CONSTRAINT investment_pkey PRIMARY KEY (serial_number);


--
-- TOC entry 3261 (class 2606 OID 32776)
-- Name: miscellaneous_costs miscellaneous_costs_pkey; Type: CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public.miscellaneous_costs
    ADD CONSTRAINT miscellaneous_costs_pkey PRIMARY KEY (id);


--
-- TOC entry 3255 (class 2606 OID 16633)
-- Name: ownerdetails ownerdetails_pkey; Type: CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public.ownerdetails
    ADD CONSTRAINT ownerdetails_pkey PRIMARY KEY (serialnum);


--
-- TOC entry 3257 (class 2606 OID 16635)
-- Name: soldcardetails soldcardetails_pkey; Type: CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public.soldcardetails
    ADD CONSTRAINT soldcardetails_pkey PRIMARY KEY (serial_number);


--
-- TOC entry 3259 (class 2606 OID 16637)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (userid);


--
-- TOC entry 3268 (class 2606 OID 24576)
-- Name: carinsurance carinsurance_registernum_fkey; Type: FK CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public.carinsurance
    ADD CONSTRAINT carinsurance_registernum_fkey FOREIGN KEY (registernumber) REFERENCES public.cardetails(registernumber) ON DELETE CASCADE;


--
-- TOC entry 3269 (class 2606 OID 16643)
-- Name: maintainancedetails maintainancedetails_maintainancedone_fkey; Type: FK CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public.maintainancedetails
    ADD CONSTRAINT maintainancedetails_maintainancedone_fkey FOREIGN KEY (maintainancedone) REFERENCES public.users(userid);


--
-- TOC entry 3270 (class 2606 OID 16648)
-- Name: maintainancedetails maintainancedetails_registernumber_fkey; Type: FK CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public.maintainancedetails
    ADD CONSTRAINT maintainancedetails_registernumber_fkey FOREIGN KEY (registernumber) REFERENCES public.cardetails(registernumber) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- TOC entry 3271 (class 2606 OID 16653)
-- Name: ownerdetails ownerdetails_registernumber_fkey; Type: FK CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public.ownerdetails
    ADD CONSTRAINT ownerdetails_registernumber_fkey FOREIGN KEY (registernumber) REFERENCES public.cardetails(registernumber) ON DELETE CASCADE;


--
-- TOC entry 3272 (class 2606 OID 16658)
-- Name: soldcardetails soldcardetails_registernumber_fkey; Type: FK CONSTRAINT; Schema: public; Owner: default
--

ALTER TABLE ONLY public.soldcardetails
    ADD CONSTRAINT soldcardetails_registernumber_fkey FOREIGN KEY (registernumber) REFERENCES public.cardetails(registernumber);


--
-- TOC entry 2089 (class 826 OID 16391)
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO neon_superuser WITH GRANT OPTION;


--
-- TOC entry 2088 (class 826 OID 16390)
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: cloud_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE cloud_admin IN SCHEMA public GRANT ALL ON TABLES TO neon_superuser WITH GRANT OPTION;


-- Completed on 2024-11-21 14:00:40

--
-- PostgreSQL database dump complete
--

