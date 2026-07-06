import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import sharonAsset from "@/assets/sharon-profile.png.asset.json";
import sharonAsset from "@/assets/sharon-profile.png.asset.json";
import awsCloudAsset from "@/assets/aws-cloud.jpg.asset.json";
const sharonImg = sharonAsset.url;

export const Route = createFileRoute("/")({
  component: Portfolio,
});

const nav = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "education", label: "Education" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

const roles = [
  "MCA Student",
  "Web Developer",
  "AWS Cloud Enthusiast",
  "Software Developer",
  "Future Software Engineer",
];

function useTyping(words: string[]) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const current = words[i % words.length];
    const speed = del ? 45 : 90;
    const t = setTimeout(() => {
      if (!del) {
        const next = current.slice(0, text.length + 1);
        setText(next);
        if (next === current) setTimeout(() => setDel(true), 1400);
      } else {
        const next = current.slice(0, text.length - 1);
        setText(next);
        if (next === "") {
          setDel(false);
          setI((v) => v + 1);
        }
      }
    }, speed);
    return () => clearTimeout(t);
  }, [text, del, i, words]);
  return text;
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("animate-fade-up");
            (e.target as HTMLElement).style.opacity = "1";
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => {
      el.style.opacity = "0";
      io.observe(el);
    });
    return () => io.disconnect();
  }, []);
}

function useScrollProgress() {
  const [p, setP] = useState(0);
  const [active, setActive] = useState("home");
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
      setP(pct);
      let current = "home";
      for (const n of nav) {
        const el = document.getElementById(n.id);
        if (el && el.getBoundingClientRect().top < 120) current = n.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return { p, active };
}

function Portfolio() {
  const typed = useTyping(roles);
  useReveal();
  const { p, active } = useScrollProgress();
  const [menu, setMenu] = useState(false);

  return (
    <div className="min-h-screen text-foreground">
      {/* Scroll progress */}
      <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-transparent">
        <div
          className="h-full transition-[width] duration-150"
          style={{ width: `${p}%`, background: "var(--gradient-primary)" }}
        />
      </div>

      {/* Nav */}
      <header className="fixed top-2 left-0 right-0 z-40 px-4">
        <nav className="glass-card mx-auto flex max-w-6xl items-center justify-between px-5 py-3">
          <a href="#home" className="font-display text-lg font-bold">
            Sharon<span className="text-gradient"></span>
          </a>
          <ul className="hidden items-center gap-1 md:flex">
            {nav.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  className={`rounded-full px-4 py-1.5 text-sm transition-colors ${
                    active === n.id
                      ? "text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  style={
                    active === n.id
                      ? { background: "var(--gradient-primary)" }
                      : undefined
                  }
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <a
            href="#contact"
            className="btn-primary hidden rounded-full px-4 py-2 text-sm font-semibold md:inline-flex"
          >
            Hire Me
          </a>
          <button
            aria-label="Open menu"
            className="md:hidden rounded-md p-2 text-foreground"
            onClick={() => setMenu((v) => !v)}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
          </button>
        </nav>
        {menu && (
          <div className="glass-card mx-auto mt-2 max-w-6xl p-3 md:hidden">
            <ul className="grid gap-1">
              {nav.map((n) => (
                <li key={n.id}>
                  <a
                    onClick={() => setMenu(false)}
                    href={`#${n.id}`}
                    className="block rounded-lg px-3 py-2 text-sm hover:bg-white/5"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      {/* Hero */}
      <section id="home" className="relative overflow-hidden px-4 pt-32 pb-20 sm:pt-36">
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[1.2fr_1fr]">
          <div>
            <p className="text-sm font-medium tracking-widest text-primary uppercase">
              Hi, I'm
            </p>
            <h1 className="mt-2 font-display text-5xl font-extrabold leading-tight sm:text-6xl">
              Sharon <span className="text-gradient">Varghese</span>
            </h1>
            <p className="mt-4 h-8 text-xl font-medium text-muted-foreground">
              <span className="caret">{typed}</span>
            </p>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground">
              An MCA student passionate about web development, software engineering,
              and cloud computing. I enjoy building practical solutions, continuously
              learning new technologies, and creating scalable applications. Currently
              seeking internship and entry-level opportunities where I can contribute,
              learn, and grow in the IT industry.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#projects" className="btn-primary rounded-full px-6 py-3 text-sm font-semibold">
                View Projects
              </a>
              <a href="#contact" className="btn-ghost rounded-full px-6 py-3 text-sm font-semibold">
                Contact Me
              </a>
              <a href="#" className="btn-ghost rounded-full px-6 py-3 text-sm font-semibold inline-flex items-center gap-2">
                <DownloadIcon /> Resume
              </a>
            </div>
            <div className="mt-8 flex items-center gap-4">
              <SocialLink href="https://github.com/sharonnvarghesee" label="GitHub"><GithubIcon /></SocialLink>
              <SocialLink href="https://www.linkedin.com/in/sharon-varghese-b2a7ab247" label="LinkedIn"><LinkedinIcon /></SocialLink>
              <SocialLink href="mailto:sharonvarghese0028@gmail.com" label="Email"><MailIcon /></SocialLink>
            </div>
          </div>

          <div className="relative mx-auto flex items-center justify-center animate-float">
            <div
              className="absolute inset-0 rounded-full blur-3xl opacity-60"
              style={{ background: "var(--gradient-primary)" }}
            />
            <div className="relative h-72 w-72 overflow-hidden rounded-full ring-2 ring-primary/40 animate-glow sm:h-80 sm:w-80">
              <img
                src={sharonImg}
                alt="Sharon Varghese"
                width={512}
                height={512}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Stat counters */}
        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-4">
          {[
            { n: "5+", l: "Projects" },
            { n: "20+", l: "Technologies" },
            { n: "1", l: "Internship" },
            { n: "9+", l: "AWS Services" },
          ].map((s) => (
            <div key={s.l} className="glass-card p-5 text-center" data-reveal>
              <div className="font-display text-3xl font-bold text-gradient">{s.n}</div>
              <div className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <Section id="about" eyebrow="About Me" title={<>About <span className="text-gradient">Sharon</span></>}>
        <div className="grid gap-10 md:grid-cols-[1fr_1.2fr]">
          <div className="glass-card overflow-hidden p-2" data-reveal>
            <div
              className="aspect-square rounded-xl"
              style={{
                background:
                  "radial-gradient(circle at 30% 30%, oklch(0.65 0.2 250 / 0.4), transparent 60%), radial-gradient(circle at 70% 70%, oklch(0.75 0.15 200 / 0.35), transparent 60%), oklch(0.21 0.04 260)",
              }}
            >
              <div className="flex h-full items-center justify-center p-8">
                <img src={sharonImg} alt="" className="h-full w-full rounded-lg object-cover" loading="lazy" />
              </div>
            </div>
          </div>
          <div data-reveal>
            <p className="text-base leading-relaxed text-muted-foreground">
              Hi, I'm Sharon Varghese, an MCA student with a strong interest in web
              development, software engineering, and cloud computing. I enjoy learning
              new technologies, improving my programming skills, and building practical
              solutions to real-world problems.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              My goal is to build a successful career in the IT industry by continuously
              learning, growing, and expanding my technical expertise. I am currently
              seeking internship and entry-level opportunities where I can apply my
              skills, gain hands-on experience, and contribute to a collaborative team.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-3">
              {[
                { t: "Education", d: "MCA in progress" },
                { t: "Internship", d: "AWS Cloud, Trinity Software Technologies" },
                { t: "Projects", d: "Cloud & Web" },
                { t: "Focus", d: "AWS · Full-Stack" },
              ].map((c) => (
                <div key={c.t} className="glass-card glass-card-hover p-4">
                  <div className="text-xs uppercase tracking-widest text-primary">{c.t}</div>
                  <div className="mt-1 text-sm font-medium">{c.d}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Education */}
      <Section id="education" eyebrow="Journey" title={<>Education <span className="text-gradient">Timeline</span></>}>
        <div className="relative mx-auto max-w-3xl">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-primary/40 to-transparent md:left-1/2" />
          {[
            { d: "2025 – 2027", t: "Master of Computer Applications (MCA)", s: "Mar Thoma Institute of Information Technology", n: "Expected 2027" },
            { d: "2022 – 2025", t: "B.Sc. in Computer Science", s: "Mar Ivanios College", n: "Graduated 2025" },
            { d: "2020 – 2022", t: "Higher Secondary (Plus Two)", s: "GHSS", n: "Completed 2022" },
            { d: "2020", t: "SSLC", s: "St. Goretti High School", n: "Completed 2020" },
          ].map((e, idx) => (
            <div
              key={e.t}
              data-reveal
              className={`relative mb-8 grid gap-4 pl-12 md:grid-cols-2 md:pl-0 ${
                idx % 2 === 0 ? "md:pr-1/2" : ""
              }`}
            >
              <span className="absolute left-2 top-2 h-4 w-4 rounded-full ring-4 ring-background md:left-1/2 md:-translate-x-1/2" style={{ background: "var(--gradient-primary)" }} />
              <div className={idx % 2 === 0 ? "md:col-start-1 md:pr-10 md:text-right" : "md:col-start-2 md:pl-10"}>
                <div className="glass-card glass-card-hover p-5">
                  <div className="text-xs font-semibold uppercase tracking-widest text-primary">{e.d}</div>
                  <h3 className="mt-1 text-lg font-semibold">{e.t}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{e.s}</p>
                  <p className="mt-2 text-xs text-muted-foreground">{e.n}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Experience */}
      <Section id="experience" eyebrow="Experience" title={<>Where I've <span className="text-gradient">Worked</span></>}>
        <div className="glass-card glass-card-hover mx-auto max-w-3xl p-6 sm:p-8" data-reveal>
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <h3 className="text-xl font-bold">AWS Cloud Intern</h3>
              <p className="text-primary">Trinity Software Technologies</p>
            </div>
            <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted-foreground">
              May 2026 · 1 Month
            </span>
          </div>
          <ul className="mt-5 grid gap-3 text-sm text-muted-foreground">
            {[
              "Designed and deployed a scalable, secure, highly available static website on AWS.",
              "Configured EC2, S3, IAM, EBS Snapshots, AMIs, ALB, Auto Scaling, ACM, and GoDaddy DNS.",
              "Applied AWS security best practices and implemented high availability architecture.",
              "Gained practical deployment experience using real-world AWS services.",
            ].map((li) => (
              <li key={li} className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>{li}</span>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Skills */}
      <Section id="skills" eyebrow="Toolbox" title={<>Skills & <span className="text-gradient">Technologies</span></>}>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { t: "Programming Languages", i: <CodeIcon />, s: ["Python", "Java", "C", "JavaScript", "PHP"] },
            { t: "Web Development", i: <GlobeIcon />, s: ["HTML5", "CSS3", "JavaScript", "Responsive Design"] },
            { t: "Cloud Computing", i: <CloudIcon />, s: ["EC2", "S3", "IAM", "VPC", "EBS", "AMI", "ALB", "Auto Scaling", "ACM"] },
            { t: "Database", i: <DbIcon />, s: ["MySQL"] },
            { t: "Tools", i: <ToolIcon />, s: ["Git", "GitHub", "VS Code"] },
            { t: "Operating Systems", i: <TerminalIcon />, s: ["Windows", "Linux"] },
            { t: "Soft Skills", i: <SparkIcon />, s: ["Problem Solving", "Teamwork", "Communication", "Adaptability", "Quick Learning"] },
          ].map((c) => (
            <div key={c.t} className="glass-card glass-card-hover p-6" data-reveal>
              <div className="flex items-center gap-3">
                <div
                  className="grid h-11 w-11 place-items-center rounded-xl text-primary-foreground"
                  style={{ background: "var(--gradient-primary)" }}
                >
                  {c.i}
                </div>
                <h3 className="font-semibold">{c.t}</h3>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {c.s.map((s) => (
                  <span key={s} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-muted-foreground">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Services */}
      <Section id="services" eyebrow="What I Do" title={<>Services I <span className="text-gradient">Provide</span></>}>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { t: "Responsive Websites", d: "Modern websites using HTML, CSS, JavaScript, and PHP.", i: <GlobeIcon /> },
            { t: "Software Development", d: "Applications built with Python, Java, and C.", i: <CodeIcon /> },
            { t: "AWS Cloud Deployment", d: "Scalable static sites using EC2, S3, IAM, VPC, ALB and more.", i: <CloudIcon /> },
            { t: "Database Management", d: "Relational database design and management with MySQL.", i: <DbIcon /> },
            { t: "Version Control", d: "Collaborative development with Git, GitHub, and VS Code.", i: <ToolIcon /> },
            { t: "Team Collaboration", d: "Communicate effectively and adapt quickly to teams.", i: <SparkIcon /> },
          ].map((s) => (
            <div key={s.t} className="glass-card glass-card-hover group p-6" data-reveal>
              <div
                className="grid h-12 w-12 place-items-center rounded-xl text-primary-foreground transition-transform group-hover:scale-110"
                style={{ background: "var(--gradient-primary)" }}
              >
                {s.i}
              </div>
              <h3 className="mt-4 text-lg font-semibold">{s.t}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Projects */}
      <Section id="projects" eyebrow="Portfolio" title={<>Recent <span className="text-gradient">Projects</span></>}>
        <div className="grid gap-6 md:grid-cols-2">
          {[
            {
              t: "AWS Static Website Deployment",
              d: "Designed and deployed a scalable, secure, highly available static website on AWS using industry best practices.",
              tags: ["EC2", "S3", "IAM", "VPC", "ALB", "Auto Scaling", "ACM", "HTML", "CSS", "JS"],
              gradient: "from-blue-500/30 to-cyan-500/20",
              icon: <CloudIcon />,
            },
            {
              t: "Sign Language Learning System",
              d: "Real-time sign recognition system that converts signs to text via camera. Integrated into a web app for learners.",
              tags: ["Python", "Django", "Computer Vision"],
              gradient: "from-cyan-500/30 to-primary/20",
              icon: <SparkIcon />,
            },
          ].map((p) => (
            <article key={p.t} className="glass-card glass-card-hover overflow-hidden" data-reveal>
              <div
                className={`relative flex h-48 items-center justify-center bg-gradient-to-br ${p.gradient}`}
              >
                <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, white 1px, transparent 1px), radial-gradient(circle at 70% 60%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
                <div className="grid h-20 w-20 place-items-center rounded-2xl bg-white/10 text-white backdrop-blur-md">
                  <div className="scale-150">{p.icon}</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold">{p.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.d}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-muted-foreground">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex gap-3">
                  <button className="btn-ghost inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold opacity-70" disabled>
                    <GithubIcon /> Coming Soon
                  </button>
                  <button className="btn-ghost inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold opacity-70" disabled>
                    Live Demo
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" eyebrow="Get in Touch" title={<>Let's Build <span className="text-gradient">Together</span></>}>
        <div className="grid gap-8 md:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4" data-reveal>
            <p className="text-muted-foreground">
              Have a project in mind? Let's connect and discuss how I can help bring
              your ideas to life.
            </p>
            <ContactRow icon={<MailIcon />} label="Email" value="sharonvarghese0028@gmail.com" href="mailto:sharonvarghese0028@gmail.com" copy />
            <ContactRow icon={<PhoneIcon />} label="Phone" value="+91 7356020527" href="tel:+917356020527" />
            <ContactRow icon={<PinIcon />} label="Location" value="Punalur, Kollam, Kerala, India" />
            <div className="flex gap-3 pt-2">
              <SocialLink href="https://github.com/sharonnvarghesee" label="GitHub"><GithubIcon /></SocialLink>
              <SocialLink href="https://www.linkedin.com/in/sharon-varghese-b2a7ab247" label="LinkedIn"><LinkedinIcon /></SocialLink>
              <SocialLink href="mailto:sharonvarghese0028@gmail.com" label="Email"><MailIcon /></SocialLink>
            </div>
          </div>
          <form
            onSubmit={(e) => { e.preventDefault(); alert("Thanks! I'll get back to you soon."); }}
            className="glass-card grid gap-4 p-6 sm:p-8"
            data-reveal
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Name" name="name" placeholder="Your name" />
              <Field label="Email" name="email" type="email" placeholder="you@example.com" />
            </div>
            <Field label="Subject" name="subject" placeholder="Project inquiry" />
            <div>
              <label className="mb-1.5 block text-xs font-medium text-muted-foreground">Message</label>
              <textarea
                required
                rows={5}
                placeholder="Tell me about your project…"
                className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
              />
            </div>
            <button type="submit" className="btn-primary mt-2 rounded-full px-6 py-3 text-sm font-semibold">
              Send Message
            </button>
          </form>
        </div>
      </Section>

      {/* Footer */}
      <footer className="mt-20 border-t border-white/5 px-4 py-10">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
          <div>
            <div className="font-display text-lg font-bold">
              Sharon<span className="text-gradient">.dev</span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">
              Designed & Developed by Sharon Varghese
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Quick Links</h4>
            <ul className="mt-3 grid grid-cols-2 gap-2 text-sm text-muted-foreground">
              {nav.map((n) => (
                <li key={n.id}><a href={`#${n.id}`} className="hover:text-foreground">{n.label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Connect</h4>
            <div className="mt-3 flex gap-3">
              <SocialLink href="https://github.com/sharonnvarghesee" label="GitHub"><GithubIcon /></SocialLink>
              <SocialLink href="https://www.linkedin.com/in/sharon-varghese-b2a7ab247" label="LinkedIn"><LinkedinIcon /></SocialLink>
              <SocialLink href="mailto:sharonvarghese0028@gmail.com" label="Email"><MailIcon /></SocialLink>
            </div>
          </div>
        </div>
        <p className="mx-auto mt-8 max-w-6xl border-t border-white/5 pt-6 text-center text-xs text-muted-foreground">
          © 2026 Sharon Varghese. All rights reserved.
        </p>
      </footer>

      {/* Back to top */}
      {p > 20 && (
        <a
          href="#home"
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-40 grid h-11 w-11 place-items-center rounded-full text-primary-foreground shadow-lg transition hover:scale-110"
          style={{ background: "var(--gradient-primary)" }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </a>
      )}
    </div>
  );
}

/* ---------- helpers ---------- */

function Section({
  id, eyebrow, title, children,
}: { id: string; eyebrow: string; title: React.ReactNode; children: React.ReactNode }) {
  return (
    <section id={id} className="relative px-4 py-20 sm:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 text-center" data-reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-primary">{eyebrow}</p>
          <h2 className="mt-2 font-display text-3xl font-bold sm:text-4xl">{title}</h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full" style={{ background: "var(--gradient-primary)" }} />
        </div>
        {children}
      </div>
    </section>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-muted-foreground transition hover:border-primary/60 hover:text-foreground hover:-translate-y-0.5"
    >
      {children}
    </a>
  );
}

function Field({ label, name, type = "text", placeholder }: { label: string; name: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-xs font-medium text-muted-foreground">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
      />
    </div>
  );
}

function ContactRow({ icon, label, value, href, copy }: { icon: React.ReactNode; label: string; value: string; href?: string; copy?: boolean }) {
  const [copied, setCopied] = useState(false);
  const inner = (
    <div className="glass-card glass-card-hover flex items-center gap-4 p-4">
      <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-primary-foreground" style={{ background: "var(--gradient-primary)" }}>
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-xs uppercase tracking-widest text-muted-foreground">{label}</div>
        <div className="truncate text-sm font-medium">{value}</div>
      </div>
      {copy && (
        <button
          type="button"
          onClick={(e) => { e.preventDefault(); navigator.clipboard.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
          className="rounded-md border border-white/10 px-2.5 py-1 text-[11px] text-muted-foreground hover:text-foreground"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      )}
    </div>
  );
  return href ? <a href={href}>{inner}</a> : inner;
}

/* ---------- icons ---------- */
const iconProps = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
function GithubIcon() { return <svg {...iconProps}><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>; }
function LinkedinIcon() { return <svg {...iconProps}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>; }
function MailIcon() { return <svg {...iconProps}><rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/></svg>; }
function PhoneIcon() { return <svg {...iconProps}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.37 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.33 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></svg>; }
function PinIcon() { return <svg {...iconProps}><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>; }
function DownloadIcon() { return <svg {...iconProps}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5"/><path d="M12 15V3"/></svg>; }
function CodeIcon() { return <svg {...iconProps}><path d="m16 18 6-6-6-6"/><path d="m8 6-6 6 6 6"/></svg>; }
function GlobeIcon() { return <svg {...iconProps}><circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z"/></svg>; }
function CloudIcon() { return <svg {...iconProps}><path d="M17.5 19a4.5 4.5 0 1 0-1.4-8.8A6 6 0 0 0 4.1 12.2 4 4 0 0 0 6 20h11.5z"/></svg>; }
function DbIcon() { return <svg {...iconProps}><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/></svg>; }
function ToolIcon() { return <svg {...iconProps}><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4l-3 3-2-2 3-3z"/></svg>; }
function TerminalIcon() { return <svg {...iconProps}><path d="m4 17 6-6-6-6"/><path d="M12 19h8"/></svg>; }
function SparkIcon() { return <svg {...iconProps}><path d="M12 2v6M12 16v6M2 12h6M16 12h6M4.9 4.9l4.2 4.2M14.9 14.9l4.2 4.2M4.9 19.1l4.2-4.2M14.9 9.1l4.2-4.2"/></svg>; }
