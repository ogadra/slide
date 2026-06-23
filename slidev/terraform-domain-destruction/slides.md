---
theme: default
title: Terraformでドメインを買うな
info: Route53のドメインがTerraformのtaintedで消えた話
colorSchema: 'light'
drawings:
  enabled: false
transition: none
defaults:
  transition: none
mdc: true
canvasWidth: 1280
fonts:
  sans: 'Noto Sans JP'
  mono: 'JetBrains Mono'
  display: 'Antonio'
  weights: '400,700,900'
  provider: google
---

<TitleCard
  subtitle="AWSぶっとんだ使い方発表会 / 2026-06-22 (Mon) / 渋谷"
  speaker="おがどら / @const_myself"
/>

---

<BodySlide size="lg">

みなさん、AWSのリソースをTerraformで管理していますよね？

</BodySlide>

---

<BodySlide size="md">

AWSのリソースのほとんどのものがTerraformで管理できるため、

Terraformで**ドメインの購入**も行えます。

</BodySlide>

---

<CodeBlock label="resource" caption="aws_route53domains_domain">

```hcl
resource "aws_route53domains_domain" "domain" {
  domain_name       = var.domain_name
  duration_in_years = 1
  auto_renew        = true
  transfer_lock     = true

  admin_privacy      = true
  billing_privacy    = true
  registrant_privacy = true
  tech_privacy       = true

  registrant_contact {
    ...
  }
}
```

</CodeBlock>

---

<CodeBlock label="$ terraform apply" caption="">

```text
╷
│ Error: waiting for Route 53 Hosted Zone (Z06119431RJ575JLG0SOI) synchronize: operation error Route 53: GetChange, get identity: get credentials: request canceled, context canceled
│
│   with module.aws_stg.aws_route53_zone.zone,
│   on modules/aws-stg/zone.tf line 1, in resource "aws_route53_zone" "zone":
│    1: resource "aws_route53_zone" "zone" {
│
╵
```

</CodeBlock>

---

<BodySlide size="md">

`terraform apply`は失敗したように見えましたが、

ドメインは作成されている状態でした。

</BodySlide>

---

<BodySlide size="lg">

その後、サブドメイン

</BodySlide>

---

<CodeBlock label="$ terraform apply" caption="">

```text
terraform apply

Terraform will perform the following actions:

  # aws_route53_record.demo will be created
  + resource "aws_route53_record" "demo" {
      + name    = "demo.ogadra.net"
      + ttl     = 300
      + type    = "A"
    }

  # aws_route53domains_domain.domain is tainted, so must be replaced
-/+ resource "aws_route53domains_domain" "domain" {
      ~ creation_date   = "2026-06-19T06:50:01Z" -> (known after apply)
      ~ expiration_date = "2027-06-19T06:50:01Z" -> (known after apply)
      ~ hosted_zone_id  = "Z03818..." -> (known after apply)
        ...
    }

Plan: 2 to add, 0 to change, 1 to destroy.

Do you want to perform these actions?
  Only 'yes' will be accepted to approve.

  Enter a value:
```

</CodeBlock>

---

<BodySlide size="lg">

すでにお気付きの方も多いでしょう。

</BodySlide>

---

<CodeBlock label="$ terraform apply" caption="">

```text {12}
terraform apply

Terraform will perform the following actions:

  # aws_route53_record.demo will be created
  + resource "aws_route53_record" "demo" {
      + name    = "demo.ogadra.net"
      + ttl     = 300
      + type    = "A"
    }

  # aws_route53domains_domain.domain is tainted, so must be replaced
-/+ resource "aws_route53domains_domain" "domain" {
      ~ creation_date   = "2026-06-19T06:50:01Z" -> (known after apply)
      ~ expiration_date = "2027-06-19T06:50:01Z" -> (known after apply)
      ~ hosted_zone_id  = "Z03818..." -> (known after apply)
        ...
    }

Plan: 2 to add, 0 to change, 1 to destroy.

Do you want to perform these actions?
  Only 'yes' will be accepted to approve.

  Enter a value:
```

</CodeBlock>

---

<CalloutSlide tone="threat" label="!! TAINTED">

`aws_route53domains_domain.domain is tainted, so must be replaced`

</CalloutSlide>

---

<BodySlide size="md">

壊れているので再作成する、と書かれていたことに…

</BodySlide>

---

<MailEvidence />

---

<LogEvidence />

---

<SectionSlide title="どうすれば良かったのか" />

---

<LessonSlide no="1" headline="<code>terraform untaint 'aws_route53domains_domain.domain'</code>" />

---

<LessonSlide no="2" headline="<code>lifecycle { prevent_destroy = true }</code>を設定する" />

---

<LessonSlide no="3" headline="Terraformで<strong>ドメインを購入しない</strong>" />

---

<OutroCard
  name="おがどら"
  handle="@const_myself"
  avatar="https://media.ogadra.com/misskey/drive/b7f08bb1-df92-45c3-855d-521eb9859015.gif"
  :links="[
    { label: 'SLIDE',   value: 'slide.ogadra.com' },
    { label: 'GITHUB',  value: 'github.com/ogadra' },
    { label: 'TWITTER', value: '@const_myself' },
  ]"
/>
