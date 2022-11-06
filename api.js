const queryString = (params) => params.filter(p => p[1] !== undefined).map(p => p[0] + encodeURIComponent(p[1])).join(
  '&');

let webpackExports = webpackChunkdiscord_app.webpackExports ? webpackChunkdiscord_app.webpackExports :
  webpackChunkdiscord_app.push([[Math.random()], {}, e => (webpackChunkdiscord_app.pop(), webpackChunkdiscord_app
    .webpackExports = e, e)]);

function getModule(e, r = !0) {
  let s = [];
  if (Array.isArray(e)) s = function e(...r) {
    let s = getModule(e => r.every(r => void 0 !== e[r]), !1),
      t = [];
    for (let o of getModule(e => r.every(r => void 0 !== e.default?.[r]), !1)) t.push(o.default);
    return [...s, ...t]
  }(...e);
  else if ("string" == typeof e) {
    var t;
    let o, d, i;
    s = (t = e, o = getModule(e => e.default?.displayName === t, !1), d = getModule(e => e.default?.type
      ?.displayName === t, !1), [...o, ...d, ...i = getModule(e => e.default?.type?.render?.displayName === t, !1)])
  }
  else if ("function" == typeof e)
    for (let u in webpackExports.c) {
      if (!Object.hasOwnProperty.call(webpackExports.c, u)) return;
      let l = webpackExports.c[u].exports;
      l && e(l) && s.push(l)
    }
  return r ? s[0] : s
}
const discord = {};
discord.client = {}, discord.users = {}, discord.server = {}, discord.extra = {}, discord.client.getCurrentUser =
  getModule([
    "getCurrentUser"]).getCurrentUser, discord.info = {
    version: 1.1,
    author: "H",
    discord: "https://discord.com/users/" + discord.client.getCurrentUser().id
  }, discord.client.getToken = getModule(["getToken"]).getToken, discord.users.getUser = getModule(["getCurrentUser"])
  .getUser, discord.users.getUsers = getModule(["getCurrentUser"]).getUsers, discord.extra.auto = (e, r, s) => {
    !0 !== Array.isArray(e) && d(e, r);
    let t = [];
    for (let o = 0; o < e.length; o++) void 0 !== d(e[o], r) && t.push(d(e[o], r));

    function d(e, r) {
      for (let t = 0; t < e.length; t++)
        if (s) {
          if (e.substring(0, e.length - t).toLowerCase() === r.toLowerCase() || e.toLowerCase().includes(r
            .toLowerCase())) return e
        }
      else if (e.substring(0, e.length - t).toLowerCase() === r.toLowerCase()) return e
    }
    return t
  }, discord.users.getByUsername = (e, r, s) => {

    let t = [],
      o = [];
    if (typeof e === "number") {
      return discord.extra.auto(Object.keys(discord.users.getUsers()), r)
    }
    else {
      for (let d = 0; d < Object.keys(discord.users.getUsers()).length; d++) o.push(discord.users.getUser(Object.keys(
          discord.users.getUsers())[d]).username + "#" + discord.users.getUser(Object.keys(discord.users.getUsers())[
          d])
        .discriminator + "#" + discord.users.getUser(Object.keys(discord.users.getUsers())[d]).id);
      if (!0 === r)
        for (let i = 0; i < discord.extra.auto(o, e, r).length; i++) t.push(discord.users.getUser(discord.extra.auto(o,
          e,
          1)[i].split("#")[discord.extra.auto(o, e, 1)[i].split("#").length - 1]));
      else
        for (let u = 0; u < discord.extra.auto(o, e).length; u++) t.push(discord.users.getUser(discord.extra.auto(o, e)[
            u]
          .split("#")[discord.extra.auto(o, e)[u].split("#").length - 1]));
      return !0 === s ? t[0] : t
    }
  };
discord.client.spoof = (user) => {
  for (let o = 0; o < Object.keys(discord.client.getCurrentUser()).length; o++) {
    discord.client.getCurrentUser()[Object.keys(discord.client.getCurrentUser())[o]] = user[Object.keys(user)[o]]
  }
}
discord.client.spoof.asOwner = () => {
  discord.server.getGuild().then(r => {
    discord.client.spoof(discord.users.getUser(r.owner_id))
  })
}
discord.server.getChannel = (id) => {
  return getChannel(id)
}
discord.server.getGuild = (id) => {
  return getGuild(id)
}

function getType() {
  if (location.href.includes('@me') === true) {
    return "channels"; // DMs
  }
  else {
    return "guilds"; // Server
  }
}
const headers = {
  "accept": "*/*",
  "accept-language": "en-US,en;q=0.9",
  "authorization": discord.client.getToken()
}
async function getChannel(id) {
  if (!id) id = location.href.split('/')[5]
  await fetch("https://discord.com/api/v9/channels/" + id, {
    "headers": headers,
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "cors",
    "credentials": "include"
  }).then(r => r.json()).then(r => window.e = r)
  return e
  delete e
}
async function getGuild(id) {
  if (!id) {
    id = discord.server.getGuildId();
    console.log('No id using currect server')
  }
  await fetch("https://discord.com/api/v9/" + getType() + "/" + id, {
    "headers": headers,
    "referrerPolicy": "strict-origin-when-cross-origin",
    "body": null,
    "method": "GET",
    "mode": "cors",
    "credentials": "include"
  }).then(r => r.json()).then(r => window.r = r)
  return r
  delete r
}
async function getInvites() {
  await fetch("https://discord.com/api/v9/guilds/" + discord.server.getGuildId() + "/invites", {
      "headers": headers,
      "body": null,
      "method": "GET",
      "mode": "cors",
      "credentials": "include"
    }).then(r => r.json()).then(r => window.r = r)
    .catch((error) => {
      console.error('Error:', error);
    });
  return r
  delete r
}
async function getUser(id) {
  if (typeof id === "undefined") {
    console.log('No id defined using a random one')
    id = Object.keys(discord.users.getUsers())[Math.floor(Math.random() * Object.keys(discord.users.getUsers())
      .length)]
  }
  await fetch("https://discord.com/api/v9/users/" + id + "/profile?with_mutual_guilds=false&guild_id=" + discord
      .server.getGuildId(), {
        "headers": headers,
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET",
        "mode": "cors",
        "credentials": "include"
      }).then(r => r.json()).then(r => window.r = r)
    .catch((error) => {
      console.error('Error:', error);
    });
  return r
  delete r
}
async function getMessages(id) {
  await fetch("https://discord.com/api/v9/channels/" + discord.server.getChannelId() + "/messages", {
      "headers": headers,
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": null,
      "method": "GET",
      "mode": "cors",
      "credentials": "include"
    }).then(r => r.json()).then(r => window.r = r)
    .catch((error) => {
      console.error('Error:', error);
    });
  return r
  delete r
}
discord.server.getMessages = getMessages;
discord.server.getMessages.search = searchMessages
async function searchMessages(search) {
  await fetch(
      "https://discord.com/api/v9/"+getType()+"/"+discord.server.getGuildId()+"/messages/search?content="+queryString([["",search]])+"&include_nsfw=true", {
        "headers": headers,
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": null,
        "method": "GET",
        "mode": "cors",
        "credentials": "include"
      }).then(r => r.json()).then(r => window.r = r)
    .catch((error) => {
      console.error('Error:', error);
    });
  return r
  delete r
}
discord.beta = {};
discord.client.getAuthorId = () => {
  const LS = document.body.appendChild(document.createElement('iframe')).contentWindow.localStorage;
  return JSON.parse(LS.user_id_cache);
}

let wpRequire;
window.webpackChunkdiscord_app.push([[Math.random()],{},e=>{wpRequire=e}]),mod=Object.values(wpRequire.c).find((e=>void 0!==e?.exports?.Z?.isDeveloper)),usermod=Object.values(wpRequire.c).find((e=>e?.exports?.default?.getUsers)),nodes=Object.values(mod.exports.Z._dispatcher._actionHandlers._dependencyGraph.nodes);try{nodes.find((e=>"ExperimentStore"==e.name)).actionHandler.OVERLAY_INITIALIZE({user:{flags:1}})}catch(e){}oldGetUser=usermod.exports.default.__proto__.getCurrentUser,usermod.exports.default.__proto__.getCurrentUser=()=>({hasFlag:()=>!0}),nodes.find((e=>"DeveloperExperimentStore"==e.name)).actionHandler.CONNECTION_OPEN(),usermod.exports.default.__proto__.getCurrentUser=oldGetUser;
let d=[]
discord.nodes={}
for (let i = 0; i < nodes.length; i++) {
    d.push(nodes[i].name)
    discord.nodes[d[i]]=nodes[i]
}
