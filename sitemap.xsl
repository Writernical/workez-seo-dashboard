<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:s="http://www.sitemaps.org/schemas/sitemap/0.9">
<xsl:output method="html" encoding="UTF-8" indent="yes"
  doctype-system="about:legacy-compat"/>

<xsl:template match="/">
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1"/>
  <title>WorkEZ — XML Sitemap</title>
  <style>
    :root{
      --bg:#F4F0F2;--card:#FFFFFF;--ink:#2B2530;--muted:#6E6675;--soft:#9C909A;
      --border:#E8DFE5;--link:#3E6FA8;--accent:#AD9299;--slate:#635D6B;
    }
    *{box-sizing:border-box;margin:0;padding:0;}
    body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;
      background:var(--bg);color:var(--ink);line-height:1.5;padding:28px 18px 60px;}
    .wrap{max-width:1200px;margin:0 auto;}
    .hero{background:linear-gradient(135deg,#2D2A33 0%,#3A3540 55%,#4A3F47 100%);
      border-radius:16px;padding:38px 40px;color:#fff;
      box-shadow:0 10px 30px rgba(60,50,60,.18);position:relative;overflow:hidden;}
    .hero:before{content:"";position:absolute;right:-40px;top:-40px;width:180px;height:180px;
      background:radial-gradient(circle,rgba(173,146,153,.35),transparent 70%);}
    .hero h1{font-size:34px;font-weight:800;letter-spacing:-.5px;}
    .hero p{margin-top:10px;font-size:15px;color:#D8D2D8;}
    .hero .brand{position:absolute;right:30px;bottom:22px;font-size:12px;color:#B7AEB6;letter-spacing:.4px;}
    table{width:100%;border-collapse:collapse;margin-top:22px;background:var(--card);
      border:1px solid var(--border);border-radius:14px;overflow:hidden;
      box-shadow:0 4px 18px rgba(99,93,107,.08);}
    thead th{text-align:left;font-size:11px;font-weight:700;text-transform:uppercase;
      letter-spacing:.6px;color:var(--soft);padding:16px 20px;border-bottom:1px solid var(--border);}
    tbody td{padding:16px 20px;border-bottom:1px solid var(--border);font-size:14px;vertical-align:top;}
    tbody tr:last-child td{border-bottom:none;}
    tbody tr:hover{background:#FBF8FA;}
    td.num{color:var(--soft);width:46px;font-variant-numeric:tabular-nums;}
    td.url a{color:var(--link);text-decoration:none;word-break:break-all;font-weight:500;}
    td.url a:hover{text-decoration:underline;}
    td.mod{color:var(--muted);font-size:12.5px;white-space:nowrap;font-variant-numeric:tabular-nums;}
    .freq{display:inline-block;background:#F0EBEE;color:var(--slate);border:1px solid var(--border);
      padding:3px 11px;border-radius:20px;font-size:11.5px;font-weight:600;text-transform:capitalize;}
    td.pri{font-weight:700;color:var(--ink);font-variant-numeric:tabular-nums;}
    .foot{margin-top:20px;text-align:center;font-size:12px;color:var(--soft);}
    @media(max-width:640px){.hero{padding:26px 22px;}.hero h1{font-size:26px;}thead{display:none;}
      tbody td{display:block;border-bottom:none;padding:4px 18px;}tbody tr{display:block;
      border-bottom:1px solid var(--border);padding:12px 0;}td.num{display:none;}}
  </style>
</head>
<body>
  <div class="wrap">
    <div class="hero">
      <h1>XML Sitemap</h1>
      <p><xsl:value-of select="count(s:urlset/s:url)"/> URLs &#183; For search engines and crawlers</p>
      <div class="brand">workez.in &#183; managed by Writernical</div>
    </div>
    <table>
      <thead>
        <tr><th>#</th><th>URL</th><th>Last Modified</th><th>Change Freq</th><th>Priority</th></tr>
      </thead>
      <tbody>
        <xsl:for-each select="s:urlset/s:url">
          <tr>
            <td class="num"><xsl:value-of select="position()"/></td>
            <td class="url"><a href="{s:loc}"><xsl:value-of select="s:loc"/></a></td>
            <td class="mod"><xsl:value-of select="substring(s:lastmod,1,10)"/></td>
            <td><span class="freq"><xsl:value-of select="s:changefreq"/></span></td>
            <td class="pri"><xsl:value-of select="s:priority"/></td>
          </tr>
        </xsl:for-each>
      </tbody>
    </table>
    <div class="foot">This is an XML sitemap, meant for search engines. The styling does not affect crawling.</div>
  </div>
</body>
</html>
</xsl:template>
</xsl:stylesheet>
