"use client";

import Link from "next/link";
import { useState, type MouseEvent } from "react";

export default function EmojiPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const copyText = async (text: string) => {
    if (!text) return;

    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }
  };

  const copyAllEmojis = async () => {
    const emojis = Array.from(document.querySelectorAll<HTMLElement>(".emoji-button"));
    const emojiText = emojis.map((emoji) => emoji.textContent ?? "").join("");
    await copyText(emojiText);
    window.alert("تم نسخ جميع الرموز التعبيرية إلى الحافظة!");
  };

  const handleEmojiClick = async (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    const emoji = target.closest<HTMLElement>(".emoji-button");
    if (!emoji) return;

    const value = emoji.textContent?.trim();
    if (value) await copyText(value);
  };

  return (
<div className="flex flex-col" onClick={handleEmojiClick}>
  <nav className="w-full bg-black md:h-11" role="navigation">
    <div
      className="flex flex-col md:items-center md:flex-row md:gap-10 md:max-w-[1140px] mx-auto py-2 px-4"
    >
      <div className="flex w-full md:w-auto whitespace-nowrap items-center">
        <Link className="w-full" href="/"
          ><span className="emoji">😋</span>
          <span className="text-white/75">Emoji</span></Link
        ><button
          type="button"
          className="md:hidden flex items-center justify-center w-10 h-10"
          onClick={() => setIsMenuOpen((open) => !open)}
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation menu"
        >
          <svg
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <g
              id="Page-1"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
            >
              <g id="Menu">
                <rect
                  id="Rectangle"
                  fillRule="nonzero"
                  x="0"
                  y="0"
                  width="24"
                  height="24"
                ></rect>
                <line
                  x1="5"
                  y1="7"
                  x2="19"
                  y2="7"
                  id="Path"
                  stroke="#ffffff"
                  strokeWidth="2"
                  strokeLinecap="round"
                ></line>
                <line
                  x1="5"
                  y1="17"
                  x2="19"
                  y2="17"
                  id="Path"
                  stroke="#ffffff"
                  strokeWidth="2"
                  strokeLinecap="round"
                ></line>
                <line
                  x1="5"
                  y1="12"
                  x2="19"
                  y2="12"
                  id="Path"
                  stroke="#ffffff"
                  strokeWidth="2"
                  strokeLinecap="round"
                ></line>
              </g>
            </g>
          </svg>
        </button>
      </div>
      <ul className="nav-links" data-visible={isMenuOpen ? "true" : "false"}>
        <li><a href="https://blog.emojipedia.org/">Blog</a></li>
        <li><a href="https://emojipedia.org/ios-emoji-support">iOS</a></li>
        <li>
          <a href="https://emojipedia.org/android-emoji-support">Android</a>
        </li>
        <li><a href="https://emojipedia.org/mac-emoji-support">Mac</a></li>
        <li>
          <a href="https://emojipedia.org/windows-emoji-support">Windows</a>
        </li>
        <li>
          <a href="https://emojipedia.org/chromebook-emoji-support"
            >Chromebook</a
          >
        </li>
        <li><a href="https://copychar.cc/">Unicode Symbols</a></li>
      </ul>
    </div>
  </nav>
  <main
    className="md:mx-auto md:max-w-[1140px] h-full w-full pt-5 pb-28 px-4 md:px-0"
  >
    <div className="flex flex-col h-full w-full gap-10">
      <h1>
        <span className="emoji">✂️</span>&nbsp;Copy and
        <span className="emoji">📋</span>&nbsp;Paste Emoji
        <span className="emoji">👍</span> <small>No&nbsp;apps&nbsp;required</small>
      </h1>
      <p>
        <a href="https://emojipedia.org">Emojis</a> are
        <a href="https://emojipedia.org/caniemoji">supported</a> on iOS,
        Android, macOS, Windows, Linux and ChromeOS. Copy and paste emojis for
        <a href="https://emojipedia.org/twitter">Twitter</a>,
        <a href="https://emojipedia.org/facebook">Facebook</a>,
        <a href="https://emojipedia.org/slack">Slack</a>,
        <a href="https://emojipedia.org/instagram">Instagram</a>,
        <a href="https://emojipedia.org/snapchat">Snapchat</a>,
        <a href="https://emojipedia.org/slack">Slack</a>,
        <a href="https://emojipedia.org/github">GitHub</a>,
        <a href="https://emojipedia.org/instagram">Instagram</a>,
        <a href="https://emojipedia.org/whatsapp">WhatsApp</a> and more.
      </p>
      <div className="flex flex-wrap w-full">
        <a href="#smileys">😃💁 People</a
        ><a href="#animals-nature"
          ><span
            className="text-black inline-flex flex-shrink-0 w-4 items-center justify-center"
            >•</span
          >🐻🌻 Animals</a
        ><a href="#food-drink"
          ><span
            className="text-black inline-flex flex-shrink-0 w-4 items-center justify-center"
            >•</span
          >🍔🍹 Food</a
        ><a href="#activities"
          ><span
            className="text-black inline-flex flex-shrink-0 w-4 items-center justify-center"
            >•</span
          >🎷⚽️ Activities</a
        ><a href="#travel-places"
          ><span
            className="text-black inline-flex flex-shrink-0 w-4 items-center justify-center"
            >•</span
          >🚘🌇 Travel</a
        ><a href="#objects"
          ><span
            className="text-black inline-flex flex-shrink-0 w-4 items-center justify-center"
            >•</span
          >💡🎉 Objects</a
        ><a href="#symbols"
          ><span
            className="text-black inline-flex flex-shrink-0 w-4 items-center justify-center"
            >•</span
          >💖🔣 Symbols</a
        ><a href="#flags"
          ><span
            className="text-black inline-flex flex-shrink-0 w-4 items-center justify-center"
            >•</span
          >🎌🏳️‍🌈 Flags</a
        >
      </div>
      <div className="flex flex-shrink-0 gap-5 justify-center">
        <div className="w-full">
          <div
            id="getemoji.com_mrec_2_v3_container"
            className="sliding-ad-container"
            style={{ minWidth: "125px", width: "100%", height: "250px", overflow: "hidden", justifyContent: "center", display: "inline-flex" }}
          >
            <div
              id="getemoji.com_mrec_2_v3_sliding-ad-shim"
              style={{ marginTop: "0px" }}
            >
              <div
                id="getemoji.com_mrec_2_v3"
                className="flex w-full items-center justify-center min-h-[250px]"
                data-ad-name="getemoji.com_mrec_2_v3"
                data-google-query-id="CMqBg9_tmpcDFa-GzgEduD4zMg"
              >
                <div
                  id="google_ads_iframe_/21872898416/FS_getemoji_com_mrec_2_0__container__"
                  style={{ border: "0pt", width: "125px", height: "0px" }}
                >
                  <div className="__fs-ancillary" style={{ visibility: "hidden" }}>
                    <div className="__fs-branding">
                      <a
                        href="https://ads.freestar.com/?utm_campaign=branding&amp;utm_medium=display&amp;utm_source=getemoji.com&amp;utm_content=getemoji.com_mrec_2_v3"
                        target="_blank"
                        rel="noreferrer"
                        ><img
                          src="https://a.pub.network/core/imgs/fslogo-green.svg"
                          alt="freestar"
                          width="14"
                          height="14"
                      /></a>
                    </div>
                    <div className="fs-branding-spacer"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div
            id="getemoji.com_mrec_1_v3_container"
            className="sliding-ad-container"
            style={{ minWidth: "125px", width: "100%", height: "250px", overflow: "hidden", justifyContent: "center", display: "inline-flex" }}
          >
            <div
              id="getemoji.com_mrec_1_v3_sliding-ad-shim"
              style={{ marginTop: "0px" }}
            >
              <div
                className="hidden adsTablet.andUp:flex w-full items-center justify-center min-h-[250px]"
                id="getemoji.com_mrec_1_v3"
                data-ad-name="getemoji.com_mrec_1_v3"
                data-google-query-id="CMuBg9_tmpcDFa-GzgEduD4zMg"
              >
                <div
                  id="google_ads_iframe_/21872898416/FS_getemoji_com_mrec_1_0__container__"
                  style={{ border: "0pt", width: "125px", height: "0px" }}
                >
                  <div className="__fs-ancillary" style={{ visibility: "hidden" }}>
                    <div className="__fs-branding">
                      <a
                        href="https://ads.freestar.com/?utm_campaign=branding&amp;utm_medium=display&amp;utm_source=getemoji.com&amp;utm_content=getemoji.com_mrec_1_v3"
                        target="_blank"
                        rel="noreferrer"
                        ><img
                          src="https://a.pub.network/core/imgs/fslogo-green.svg"
                          alt="freestar"
                          width="14"
                          height="14"
                      /></a>
                    </div>
                    <div className="fs-branding-spacer"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="flex flex-col w-auto gap-4 mx-auto md:mx-0">
        <h2 id="smileys">
          <a
            title="Names and meanings of smiley emojis"
            href="https://emojipedia.org/smileys"
            target="_blank"
            >Smileys</a
          >
        </h2>
        <form
          className="w-full flex overflow-hidden"
          role="search"
          action="https://emojipedia.org/search"
          method="get"
        >
          <input
            type="text"
            className="w-full h-10 p-4 border border-grey/10 rounded-tl-md rounded-bl-md focus:outline-blue/20"
            placeholder="Find emojis by name or description"
            id="srch-term"
            name="q"
          /><button
            type="submit"
            className="w-10 flex items-center justify-center border border-grey/10 rounded-tr-md rounded-br-md border-l-0 hover:bg-grey/10"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_1337_1457)">
                <path
                  d="M13.9043 12.8215L10.5848 9.50195C10.5219 9.43906 10.4398 9.40625 10.3523 9.40625H9.99141C10.8527 8.4082 11.375 7.10938 11.375 5.6875C11.375 2.5457 8.8293 0 5.6875 0C2.5457 0 0 2.5457 0 5.6875C0 8.8293 2.5457 11.375 5.6875 11.375C7.10938 11.375 8.4082 10.8527 9.40625 9.99141V10.3523C9.40625 10.4398 9.4418 10.5219 9.50195 10.5848L12.8215 13.9043C12.95 14.0328 13.1578 14.0328 13.2863 13.9043L13.9043 13.2863C14.0328 13.1578 14.0328 12.95 13.9043 12.8215ZM5.6875 10.0625C3.27031 10.0625 1.3125 8.10469 1.3125 5.6875C1.3125 3.27031 3.27031 1.3125 5.6875 1.3125C8.10469 1.3125 10.0625 3.27031 10.0625 5.6875C10.0625 8.10469 8.10469 10.0625 5.6875 10.0625Z"
                  fill="#111111"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0_1337_1457">
                  <rect width="14" height="14" fill="white"></rect>
                </clipPath>
              </defs>
            </svg>
          </button>
        </form>
        <div>
          Did you know? July 17 is
          <a href="https://worldemojiday.com" target="_blank"
            ><span className="emoji">📅</span> World Emoji Day</a
          >
        </div>
                <button id="copy-all-emojis" type="button" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={copyAllEmojis}>
            Copy All Emojis
          </button>
        <div className="flex flex-wrap">
          <div className="emoji emoji-button">😀</div>
          <div className="emoji emoji-button">😃</div>
          <div className="emoji emoji-button">😄</div>
          <div className="emoji emoji-button">😁</div>
          <div className="emoji emoji-button">😆</div>
          <div className="emoji emoji-button">😅</div>
          <div className="emoji emoji-button">😂</div>
          <div className="emoji emoji-button">🤣</div>
          <div className="emoji emoji-button">🥲</div>
          <div className="emoji emoji-button">🥹</div>
          <div className="emoji emoji-button">☺️</div>
          <div className="emoji emoji-button">😊</div>
          <div className="emoji emoji-button">😇</div>
          <div className="emoji emoji-button">🙂</div>
          <div className="emoji emoji-button">🙃</div>
          <div className="emoji emoji-button">😉</div>
          <div className="emoji emoji-button">😌</div>
          <div className="emoji emoji-button">😍</div>
          <div className="emoji emoji-button">🥰</div>
          <div className="emoji emoji-button">😘</div>
          <div className="emoji emoji-button">😗</div>
          <div className="emoji emoji-button">😙</div>
          <div className="emoji emoji-button">😚</div>
          <div className="emoji emoji-button">😋</div>
          <div className="emoji emoji-button">😛</div>
          <div className="emoji emoji-button">😝</div>
          <div className="emoji emoji-button">😜</div>
          <div className="emoji emoji-button">🤪</div>
          <div className="emoji emoji-button">🫪</div>
          <div className="emoji emoji-button">🤨</div>
          <div className="emoji emoji-button">🧐</div>
          <div className="emoji emoji-button">🤓</div>
          <div className="emoji emoji-button">😎</div>
          <div className="emoji emoji-button">🥸</div>
          <div className="emoji emoji-button">🤩</div>
          <div className="emoji emoji-button">🥳</div>
          <div className="emoji emoji-button">🙂‍↕️</div>
          <div className="emoji emoji-button">😏</div>
          <div className="emoji emoji-button">😒</div>
          <div className="emoji emoji-button">🙂‍↔️</div>
          <div className="emoji emoji-button">😞</div>
          <div className="emoji emoji-button">😔</div>
          <div className="emoji emoji-button">😟</div>
          <div className="emoji emoji-button">😕</div>
          <div className="emoji emoji-button">🙁</div>
          <div className="emoji emoji-button">☹️</div>
          <div className="emoji emoji-button">😣</div>
          <div className="emoji emoji-button">😖</div>
          <div className="emoji emoji-button">😫</div>
          <div className="emoji emoji-button">😩</div>
          <div className="emoji emoji-button">🥺</div>
          <div className="emoji emoji-button">😢</div>
          <div className="emoji emoji-button">😭</div>
          <div className="emoji emoji-button">😮‍💨</div>
          <div className="emoji emoji-button">😤</div>
          <div className="emoji emoji-button">😠</div>
          <div className="emoji emoji-button">😡</div>
          <div className="emoji emoji-button">🤬</div>
          <div className="emoji emoji-button">🤯</div>
          <div className="emoji emoji-button">😳</div>
          <div className="emoji emoji-button">🥵</div>
          <div className="emoji emoji-button">🥶</div>
          <div className="emoji emoji-button">😱</div>
          <div className="emoji emoji-button">😨</div>
          <div className="emoji emoji-button">😰</div>
          <div className="emoji emoji-button">😥</div>
          <div className="emoji emoji-button">😓</div>
          <div className="emoji emoji-button">🫣</div>
          <div className="emoji emoji-button">🫡</div>
          <div className="emoji emoji-button">🤔</div>
          <div className="emoji emoji-button">🫢</div>
          <div className="emoji emoji-button">🤭</div>
          <div className="emoji emoji-button">🤫</div>
          <div className="emoji emoji-button">🤥</div>
          <div className="emoji emoji-button">😶</div>
          <div className="emoji emoji-button">😶‍🌫️</div>
          <div className="emoji emoji-button">😐</div>
          <div className="emoji emoji-button">😑</div>
          <div className="emoji emoji-button">😬</div>
          <div className="emoji emoji-button">🫨</div>
          <div className="emoji emoji-button">🫠</div>
          <div className="emoji emoji-button">🙄</div>
          <div className="emoji emoji-button">😯</div>
          <div className="emoji emoji-button">😦</div>
          <div className="emoji emoji-button">😧</div>
          <div className="emoji emoji-button">😮</div>
          <div className="emoji emoji-button">😲</div>
          <div className="emoji emoji-button">🥱</div>
          <div className="emoji emoji-button">😴</div>
          <div className="emoji emoji-button">🫩</div>
          <div className="emoji emoji-button">🤤</div>
          <div className="emoji emoji-button">😪</div>
          <div className="emoji emoji-button">😵</div>
          <div className="emoji emoji-button">😵‍💫</div>
          <div className="emoji emoji-button">🫥</div>
          <div className="emoji emoji-button">🤐</div>
          <div className="emoji emoji-button">🥴</div>
          <div className="emoji emoji-button">🤢</div>
          <div className="emoji emoji-button">🤮</div>
          <div className="emoji emoji-button">🤧</div>
          <div className="emoji emoji-button">😷</div>
          <div className="emoji emoji-button">🤒</div>
          <div className="emoji emoji-button">🤕</div>
          <div className="emoji emoji-button">🤑</div>
          <div className="emoji emoji-button">🤠</div>
          <div className="emoji emoji-button">😈</div>
          <div className="emoji emoji-button">👿</div>
          <div className="emoji emoji-button">👹</div>
          <div className="emoji emoji-button">👺</div>
          <div className="emoji emoji-button">🤡</div>
          <div className="emoji emoji-button">💩</div>
          <div className="emoji emoji-button">👻</div>
          <div className="emoji emoji-button">💀</div>
          <div className="emoji emoji-button">☠️</div>
          <div className="emoji emoji-button">👽</div>
          <div className="emoji emoji-button">👾</div>
          <div className="emoji emoji-button">🤖</div>
          <div className="emoji emoji-button">🎃</div>
          <div className="emoji emoji-button">😺</div>
          <div className="emoji emoji-button">😸</div>
          <div className="emoji emoji-button">😹</div>
          <div className="emoji emoji-button">😻</div>
          <div className="emoji emoji-button">😼</div>
          <div className="emoji emoji-button">😽</div>
          <div className="emoji emoji-button">🙀</div>
          <div className="emoji emoji-button">😿</div>
          <div className="emoji emoji-button">😾</div>
        </div>
      </section>
      <div
        className="flex w-full justify-center items-center min-h-[280px]"
        data-freestar-ad="__336x280 __970x250"
        id="getemoji.com_billboard_atf_v3"
        data-ad-name="getemoji.com_billboard_atf_v3"
        data-google-query-id="CMyBg9_tmpcDFa-GzgEduD4zMg"
      >
        <div
          id="google_ads_iframe_/21872898416/FS_getemoji_com_billboard_atf_0__container__"
          style={{ border: "0pt", width: "468px", height: "0px" }}
        >
          <div className="__fs-ancillary" style={{ visibility: "hidden" }}>
            <div className="__fs-branding">
              <a
                href="https://ads.freestar.com/?utm_campaign=branding&amp;utm_medium=display&amp;utm_source=getemoji.com&amp;utm_content=getemoji.com_billboard_atf_v3"
                target="_blank"
                rel="noreferrer"
                ><img
                  src="https://a.pub.network/core/imgs/fslogo-green.svg"
                  alt="freestar"
                  width="14"
                  height="14"
              /></a>
            </div>
            <div className="fs-branding-spacer"></div>
          </div>
        </div>
      </div>
      <section className="flex flex-col w-auto gap-4 mx-auto md:mx-0">
        <h2>
          <a
            title="List of people and fantasy emojis"
            href="https://emojipedia.org/people"
            target="_blank"
            >Gestures and Body Parts</a
          >
        </h2>
        <div className="flex flex-wrap">
          <div className="emoji emoji-button">👋</div>
          <div className="emoji emoji-button">🤚</div>
          <div className="emoji emoji-button">🖐</div>
          <div className="emoji emoji-button">✋</div>
          <div className="emoji emoji-button">🖖</div>
          <div className="emoji emoji-button">👌</div>
          <div className="emoji emoji-button">🤌</div>
          <div className="emoji emoji-button">🤏</div>
          <div className="emoji emoji-button">✌️</div>
          <div className="emoji emoji-button">🤞</div>
          <div className="emoji emoji-button">🫰</div>
          <div className="emoji emoji-button">🤟</div>
          <div className="emoji emoji-button">🤘</div>
          <div className="emoji emoji-button">🤙</div>
          <div className="emoji emoji-button">🫵</div>
          <div className="emoji emoji-button">🫱</div>
          <div className="emoji emoji-button">🫲</div>
          <div className="emoji emoji-button">🫸</div>
          <div className="emoji emoji-button">🫷</div>
          <div className="emoji emoji-button">🫳</div>
          <div className="emoji emoji-button">🫴</div>
          <div className="emoji emoji-button">👈</div>
          <div className="emoji emoji-button">👉</div>
          <div className="emoji emoji-button">👆</div>
          <div className="emoji emoji-button">🖕</div>
          <div className="emoji emoji-button">👇</div>
          <div className="emoji emoji-button">☝️</div>
          <div className="emoji emoji-button">👍</div>
          <div className="emoji emoji-button">👎</div>
          <div className="emoji emoji-button">✊</div>
          <div className="emoji emoji-button">👊</div>
          <div className="emoji emoji-button">🤛</div>
          <div className="emoji emoji-button">🤜</div>
          <div className="emoji emoji-button">👏</div>
          <div className="emoji emoji-button">🫶</div>
          <div className="emoji emoji-button">🙌</div>
          <div className="emoji emoji-button">👐</div>
          <div className="emoji emoji-button">🤲</div>
          <div className="emoji emoji-button">🤝</div>
          <div className="emoji emoji-button">🙏</div>
          <div className="emoji emoji-button">✍️</div>
          <div className="emoji emoji-button">💅</div>
          <div className="emoji emoji-button">🤳</div>
          <div className="emoji emoji-button">💪</div>
          <div className="emoji emoji-button">🦾</div>
          <div className="emoji emoji-button">🦵</div>
          <div className="emoji emoji-button">🦿</div>
          <div className="emoji emoji-button">🦶</div>
          <div className="emoji emoji-button">👣</div>
          <div className="emoji emoji-button">🫆</div>
          <div className="emoji emoji-button">👂</div>
          <div className="emoji emoji-button">🦻</div>
          <div className="emoji emoji-button">👃</div>
          <div className="emoji emoji-button">🫀</div>
          <div className="emoji emoji-button">🫁</div>
          <div className="emoji emoji-button">🧠</div>
          <div className="emoji emoji-button">🦷</div>
          <div className="emoji emoji-button">🦴</div>
          <div className="emoji emoji-button">👀</div>
          <div className="emoji emoji-button">👁</div>
          <div className="emoji emoji-button">👅</div>
          <div className="emoji emoji-button">👄</div>
          <div className="emoji emoji-button">🫦</div>
          <div className="emoji emoji-button">💋</div>
          <div className="emoji emoji-button">🩸</div>
        </div>
      </section>
      <section className="flex flex-col w-auto gap-4 mx-auto md:mx-0">
        <h2>
          <a
            title="List of people and fantasy emojis"
            href="https://emojipedia.org/people"
            target="_blank"
            >People and Fantasy</a
          >
        </h2>
        <div className="flex flex-wrap">
          <div className="emoji emoji-button">👶</div>
          <div className="emoji emoji-button">👧</div>
          <div className="emoji emoji-button">🧒</div>
          <div className="emoji emoji-button">👦</div>
          <div className="emoji emoji-button">👩</div>
          <div className="emoji emoji-button">🧑</div>
          <div className="emoji emoji-button">👨</div>
          <div className="emoji emoji-button">👩‍🦱</div>
          <div className="emoji emoji-button">🧑‍🦱</div>
          <div className="emoji emoji-button">👨‍🦱</div>
          <div className="emoji emoji-button">👩‍🦰</div>
          <div className="emoji emoji-button">🧑‍🦰</div>
          <div className="emoji emoji-button">👨‍🦰</div>
          <div className="emoji emoji-button">👱‍♀️</div>
          <div className="emoji emoji-button">👱</div>
          <div className="emoji emoji-button">👱‍♂️</div>
          <div className="emoji emoji-button">👩‍🦳</div>
          <div className="emoji emoji-button">🧑‍🦳</div>
          <div className="emoji emoji-button">👨‍🦳</div>
          <div className="emoji emoji-button">👩‍🦲</div>
          <div className="emoji emoji-button">🧑‍🦲</div>
          <div className="emoji emoji-button">👨‍🦲</div>
          <div className="emoji emoji-button">🧔‍♀️</div>
          <div className="emoji emoji-button">🧔</div>
          <div className="emoji emoji-button">🧔‍♂️</div>
          <div className="emoji emoji-button">👵</div>
          <div className="emoji emoji-button">🧓</div>
          <div className="emoji emoji-button">👴</div>
          <div className="emoji emoji-button">👲</div>
          <div className="emoji emoji-button">👳‍♀️</div>
          <div className="emoji emoji-button">👳</div>
          <div className="emoji emoji-button">👳‍♂️</div>
          <div className="emoji emoji-button">🧕</div>
          <div className="emoji emoji-button">👮‍♀️</div>
          <div className="emoji emoji-button">👮</div>
          <div className="emoji emoji-button">👮‍♂️</div>
          <div className="emoji emoji-button">👷‍♀️</div>
          <div className="emoji emoji-button">👷</div>
          <div className="emoji emoji-button">👷‍♂️</div>
          <div className="emoji emoji-button">💂‍♀️</div>
          <div className="emoji emoji-button">💂</div>
          <div className="emoji emoji-button">💂‍♂️</div>
          <div className="emoji emoji-button">🕵️‍♀️</div>
          <div className="emoji emoji-button">🕵️</div>
          <div className="emoji emoji-button">🕵️‍♂️</div>
          <div className="emoji emoji-button">👩‍⚕️</div>
          <div className="emoji emoji-button">🧑‍⚕️</div>
          <div className="emoji emoji-button">👨‍⚕️</div>
          <div className="emoji emoji-button">👩‍🌾</div>
          <div className="emoji emoji-button">🧑‍🌾</div>
          <div className="emoji emoji-button">👨‍🌾</div>
          <div className="emoji emoji-button">👩‍🍳</div>
          <div className="emoji emoji-button">🧑‍🍳</div>
          <div className="emoji emoji-button">👨‍🍳</div>
          <div className="emoji emoji-button">👩‍🎓</div>
          <div className="emoji emoji-button">🧑‍🎓</div>
          <div className="emoji emoji-button">👨‍🎓</div>
          <div className="emoji emoji-button">👩‍🎤</div>
          <div className="emoji emoji-button">🧑‍🎤</div>
          <div className="emoji emoji-button">👨‍🎤</div>
          <div className="emoji emoji-button">👩‍🏫</div>
          <div className="emoji emoji-button">🧑‍🏫</div>
          <div className="emoji emoji-button">👨‍🏫</div>
          <div className="emoji emoji-button">👩‍🏭</div>
          <div className="emoji emoji-button">🧑‍🏭</div>
          <div className="emoji emoji-button">👨‍🏭</div>
          <div className="emoji emoji-button">👩‍💻</div>
          <div className="emoji emoji-button">🧑‍💻</div>
          <div className="emoji emoji-button">👨‍💻</div>
          <div className="emoji emoji-button">👩‍💼</div>
          <div className="emoji emoji-button">🧑‍💼</div>
          <div className="emoji emoji-button">👨‍💼</div>
          <div className="emoji emoji-button">👩‍🔧</div>
          <div className="emoji emoji-button">🧑‍🔧</div>
          <div className="emoji emoji-button">👨‍🔧</div>
          <div className="emoji emoji-button">👩‍🔬</div>
          <div className="emoji emoji-button">🧑‍🔬</div>
          <div className="emoji emoji-button">👨‍🔬</div>
          <div className="emoji emoji-button">👩‍🎨</div>
          <div className="emoji emoji-button">🧑‍🎨</div>
          <div className="emoji emoji-button">👨‍🎨</div>
          <div className="emoji emoji-button">👩‍🚒</div>
          <div className="emoji emoji-button">🧑‍🚒</div>
          <div className="emoji emoji-button">👨‍🚒</div>
          <div className="emoji emoji-button">👩‍✈️</div>
          <div className="emoji emoji-button">🧑‍✈️</div>
          <div className="emoji emoji-button">👨‍✈️</div>
          <div className="emoji emoji-button">👩‍🚀</div>
          <div className="emoji emoji-button">🧑‍🚀</div>
          <div className="emoji emoji-button">👨‍🚀</div>
          <div className="emoji emoji-button">👩‍⚖️</div>
          <div className="emoji emoji-button">🧑‍⚖️</div>
          <div className="emoji emoji-button">👨‍⚖️</div>
          <div className="emoji emoji-button">👰‍♀️</div>
          <div className="emoji emoji-button">👰</div>
          <div className="emoji emoji-button">👰‍♂️</div>
          <div className="emoji emoji-button">🤵‍♀️</div>
          <div className="emoji emoji-button">🤵</div>
          <div className="emoji emoji-button">🤵‍♂️</div>
          <div className="emoji emoji-button">👸</div>
          <div className="emoji emoji-button">🫅</div>
          <div className="emoji emoji-button">🤴</div>
          <div className="emoji emoji-button">🥷</div>
          <div className="emoji emoji-button">🦸‍♀️</div>
          <div className="emoji emoji-button">🦸</div>
          <div className="emoji emoji-button">🦸‍♂️</div>
          <div className="emoji emoji-button">🦹‍♀️</div>
          <div className="emoji emoji-button">🦹</div>
          <div className="emoji emoji-button">🦹‍♂️</div>
          <div className="emoji emoji-button">🤶</div>
          <div className="emoji emoji-button">🧑‍🎄</div>
          <div className="emoji emoji-button">🎅</div>
          <div className="emoji emoji-button">🧙‍♀️</div>
          <div className="emoji emoji-button">🧙</div>
          <div className="emoji emoji-button">🧙‍♂️</div>
          <div className="emoji emoji-button">🧝‍♀️</div>
          <div className="emoji emoji-button">🧝</div>
          <div className="emoji emoji-button">🧝‍♂️</div>
          <div className="emoji emoji-button">🧛‍♀️</div>
          <div className="emoji emoji-button">🧛</div>
          <div className="emoji emoji-button">🧛‍♂️</div>
          <div className="emoji emoji-button">🧟‍♀️</div>
          <div className="emoji emoji-button">🧟</div>
          <div className="emoji emoji-button">🧟‍♂️</div>
          <div className="emoji emoji-button">🧞‍♀️</div>
          <div className="emoji emoji-button">🧞</div>
          <div className="emoji emoji-button">🧞‍♂️</div>
          <div className="emoji emoji-button">🧜‍♀️</div>
          <div className="emoji emoji-button">🧜</div>
          <div className="emoji emoji-button">🧜‍♂️</div>
          <div className="emoji emoji-button">🧚‍♀️</div>
          <div className="emoji emoji-button">🧚</div>
          <div className="emoji emoji-button">🧚‍♂️</div>
          <div className="emoji emoji-button">🧌</div>
          <div className="emoji emoji-button">🫈</div>
          <div className="emoji emoji-button">👼</div>
          <div className="emoji emoji-button">🤰</div>
          <div className="emoji emoji-button">🫄</div>
          <div className="emoji emoji-button">🫃</div>
          <div className="emoji emoji-button">🤱</div>
          <div className="emoji emoji-button">👩‍🍼</div>
          <div className="emoji emoji-button">🧑‍🍼</div>
          <div className="emoji emoji-button">👨‍🍼</div>
          <div className="emoji emoji-button">🙇‍♀️</div>
          <div className="emoji emoji-button">🙇</div>
          <div className="emoji emoji-button">🙇‍♂️</div>
          <div className="emoji emoji-button">💁‍♀️</div>
          <div className="emoji emoji-button">💁</div>
          <div className="emoji emoji-button">💁‍♂️</div>
          <div className="emoji emoji-button">🙅‍♀️</div>
          <div className="emoji emoji-button">🙅</div>
          <div className="emoji emoji-button">🙅‍♂️</div>
          <div className="emoji emoji-button">🙆‍♀️</div>
          <div className="emoji emoji-button">🙆</div>
          <div className="emoji emoji-button">🙆‍♂️</div>
          <div className="emoji emoji-button">🙋‍♀️</div>
          <div className="emoji emoji-button">🙋</div>
          <div className="emoji emoji-button">🙋‍♂️</div>
          <div className="emoji emoji-button">🧏‍♀️</div>
          <div className="emoji emoji-button">🧏</div>
          <div className="emoji emoji-button">🧏‍♂️</div>
          <div className="emoji emoji-button">🤦‍♀️</div>
          <div className="emoji emoji-button">🤦</div>
          <div className="emoji emoji-button">🤦‍♂️</div>
          <div className="emoji emoji-button">🤷‍♀️</div>
          <div className="emoji emoji-button">🤷</div>
          <div className="emoji emoji-button">🤷‍♂️</div>
          <div className="emoji emoji-button">🙎‍♀️</div>
          <div className="emoji emoji-button">🙎</div>
          <div className="emoji emoji-button">🙎‍♂️</div>
          <div className="emoji emoji-button">🙍‍♀️</div>
          <div className="emoji emoji-button">🙍</div>
          <div className="emoji emoji-button">🙍‍♂️</div>
          <div className="emoji emoji-button">💇‍♀️</div>
          <div className="emoji emoji-button">💇</div>
          <div className="emoji emoji-button">💇‍♂️</div>
          <div className="emoji emoji-button">💆‍♀️</div>
          <div className="emoji emoji-button">💆</div>
          <div className="emoji emoji-button">💆‍♂️</div>
          <div className="emoji emoji-button">🧖‍♀️</div>
          <div className="emoji emoji-button">🧖</div>
          <div className="emoji emoji-button">🧖‍♂️</div>
          <div className="emoji emoji-button">💅</div>
          <div className="emoji emoji-button">🤳</div>
          <div className="emoji emoji-button">🧑‍🩰</div>
          <div className="emoji emoji-button">💃</div>
          <div className="emoji emoji-button">🕺</div>
          <div className="emoji emoji-button">👯‍♀️</div>
          <div className="emoji emoji-button">👯</div>
          <div className="emoji emoji-button">👯‍♂️</div>
          <div className="emoji emoji-button">🕴</div>
          <div className="emoji emoji-button">👩‍🦽</div>
          <div className="emoji emoji-button">👩‍🦽‍➡️</div>
          <div className="emoji emoji-button">🧑‍🦽</div>
          <div className="emoji emoji-button">🧑‍🦽‍➡️</div>
          <div className="emoji emoji-button">👨‍🦽</div>
          <div className="emoji emoji-button">👨‍🦽‍➡️</div>
          <div className="emoji emoji-button">👩‍🦼</div>
          <div className="emoji emoji-button">👩‍🦼‍➡️</div>
          <div className="emoji emoji-button">🧑‍🦼</div>
          <div className="emoji emoji-button">🧑‍🦼‍➡️</div>
          <div className="emoji emoji-button">👨‍🦼</div>
          <div className="emoji emoji-button">👨‍🦼‍➡️</div>
          <div className="emoji emoji-button">🚶‍♀️</div>
          <div className="emoji emoji-button">🚶‍♀️‍➡️</div>
          <div className="emoji emoji-button">🚶</div>
          <div className="emoji emoji-button">🚶‍➡️</div>
          <div className="emoji emoji-button">🚶‍♂️</div>
          <div className="emoji emoji-button">🚶‍♂️‍➡️</div>
          <div className="emoji emoji-button">👩‍🦯</div>
          <div className="emoji emoji-button">👩‍🦯‍➡️</div>
          <div className="emoji emoji-button">🧑‍🦯</div>
          <div className="emoji emoji-button">🧑‍🦯‍➡️</div>
          <div className="emoji emoji-button">👨‍🦯</div>
          <div className="emoji emoji-button">👨‍🦯‍➡️</div>
          <div className="emoji emoji-button">🧎‍♀️</div>
          <div className="emoji emoji-button">🧎‍♀️‍➡️</div>
          <div className="emoji emoji-button">🧎</div>
          <div className="emoji emoji-button">🧎‍➡️</div>
          <div className="emoji emoji-button">🧎‍♂️</div>
          <div className="emoji emoji-button">🧎‍♂️‍➡️</div>
          <div className="emoji emoji-button">🏃‍♀️</div>
          <div className="emoji emoji-button">🏃‍♀️‍➡️</div>
          <div className="emoji emoji-button">🏃</div>
          <div className="emoji emoji-button">🏃‍➡️</div>
          <div className="emoji emoji-button">🏃‍♂️</div>
          <div className="emoji emoji-button">🏃‍♂️‍➡️</div>
          <div className="emoji emoji-button">🧍‍♀️</div>
          <div className="emoji emoji-button">🧍</div>
          <div className="emoji emoji-button">🧍‍♂️</div>
          <div className="emoji emoji-button">👭</div>
          <div className="emoji emoji-button">🧑‍🤝‍🧑</div>
          <div className="emoji emoji-button">👬</div>
          <div className="emoji emoji-button">👫</div>
          <div className="emoji emoji-button">👩‍❤️‍👩</div>
          <div className="emoji emoji-button">💑</div>
          <div className="emoji emoji-button">👨‍❤️‍👨</div>
          <div className="emoji emoji-button">👩‍❤️‍👨</div>
          <div className="emoji emoji-button">👩‍❤️‍💋‍👩</div>
          <div className="emoji emoji-button">💏</div>
          <div className="emoji emoji-button">👨‍❤️‍💋‍👨</div>
          <div className="emoji emoji-button">👩‍❤️‍💋‍👨</div>
          <div className="emoji emoji-button">👪</div>
          <div className="emoji emoji-button">👨‍👩‍👦</div>
          <div className="emoji emoji-button">👨‍👩‍👧</div>
          <div className="emoji emoji-button">👨‍👩‍👧‍👦</div>
          <div className="emoji emoji-button">👨‍👩‍👦‍👦</div>
          <div className="emoji emoji-button">👨‍👩‍👧‍👧</div>
          <div className="emoji emoji-button">👨‍👨‍👦</div>
          <div className="emoji emoji-button">👨‍👨‍👧</div>
          <div className="emoji emoji-button">👨‍👨‍👧‍👦</div>
          <div className="emoji emoji-button">👨‍👨‍👦‍👦</div>
          <div className="emoji emoji-button">👨‍👨‍👧‍👧</div>
          <div className="emoji emoji-button">👩‍👩‍👦</div>
          <div className="emoji emoji-button">👩‍👩‍👧</div>
          <div className="emoji emoji-button">👩‍👩‍👧‍👦</div>
          <div className="emoji emoji-button">👩‍👩‍👦‍👦</div>
          <div className="emoji emoji-button">👩‍👩‍👧‍👧</div>
          <div className="emoji emoji-button">👨‍👦</div>
          <div className="emoji emoji-button">👨‍👦‍👦</div>
          <div className="emoji emoji-button">👨‍👧</div>
          <div className="emoji emoji-button">👨‍👧‍👦</div>
          <div className="emoji emoji-button">👨‍👧‍👧</div>
          <div className="emoji emoji-button">👩‍👦</div>
          <div className="emoji emoji-button">👩‍👦‍👦</div>
          <div className="emoji emoji-button">👩‍👧</div>
          <div className="emoji emoji-button">👩‍👧‍👦</div>
          <div className="emoji emoji-button">👩‍👧‍👧</div>
          <div className="emoji emoji-button">🧑‍🧑‍🧒</div>
          <div className="emoji emoji-button">🧑‍🧑‍🧒‍🧒</div>
          <div className="emoji emoji-button">🧑‍🧒</div>
          <div className="emoji emoji-button">🧑‍🧒‍🧒</div>
          <div className="emoji emoji-button">🗣</div>
          <div className="emoji emoji-button">👤</div>
          <div className="emoji emoji-button">👥</div>
          <div className="emoji emoji-button">🫂</div>
        </div>
      </section>
      <section className="flex flex-col w-auto gap-4 mx-auto md:mx-0">
        <h2>
          <a
            title="List of clothing emojis"
            href="https://emojipedia.org/people"
            target="_blank"
            >Clothing and Accessories</a
          >
        </h2>
        <div className="flex flex-wrap">
          <div className="emoji emoji-button">🧳</div>
          <div className="emoji emoji-button">🌂</div>
          <div className="emoji emoji-button">☂️</div>
          <div className="emoji emoji-button">🧵</div>
          <div className="emoji emoji-button">🪡</div>
          <div className="emoji emoji-button">🪢</div>
          <div className="emoji emoji-button">🪭</div>
          <div className="emoji emoji-button">🧶</div>
          <div className="emoji emoji-button">👓</div>
          <div className="emoji emoji-button">🕶</div>
          <div className="emoji emoji-button">🥽</div>
          <div className="emoji emoji-button">🥼</div>
          <div className="emoji emoji-button">🦺</div>
          <div className="emoji emoji-button">👔</div>
          <div className="emoji emoji-button">👕</div>
          <div className="emoji emoji-button">👖</div>
          <div className="emoji emoji-button">🧣</div>
          <div className="emoji emoji-button">🧤</div>
          <div className="emoji emoji-button">🧥</div>
          <div className="emoji emoji-button">🧦</div>
          <div className="emoji emoji-button">👗</div>
          <div className="emoji emoji-button">👘</div>
          <div className="emoji emoji-button">🥻</div>
          <div className="emoji emoji-button">🩴</div>
          <div className="emoji emoji-button">🩱</div>
          <div className="emoji emoji-button">🩲</div>
          <div className="emoji emoji-button">🩳</div>
          <div className="emoji emoji-button">👙</div>
          <div className="emoji emoji-button">👚</div>
          <div className="emoji emoji-button">👛</div>
          <div className="emoji emoji-button">👜</div>
          <div className="emoji emoji-button">👝</div>
          <div className="emoji emoji-button">🎒</div>
          <div className="emoji emoji-button">👞</div>
          <div className="emoji emoji-button">👟</div>
          <div className="emoji emoji-button">🥾</div>
          <div className="emoji emoji-button">🥿</div>
          <div className="emoji emoji-button">👠</div>
          <div className="emoji emoji-button">👡</div>
          <div className="emoji emoji-button">🩰</div>
          <div className="emoji emoji-button">👢</div>
          <div className="emoji emoji-button">👑</div>
          <div className="emoji emoji-button">👒</div>
          <div className="emoji emoji-button">🎩</div>
          <div className="emoji emoji-button">🎓</div>
          <div className="emoji emoji-button">🧢</div>
          <div className="emoji emoji-button">⛑</div>
          <div className="emoji emoji-button">🪖</div>
          <div className="emoji emoji-button">💄</div>
          <div className="emoji emoji-button">💍</div>
          <div className="emoji emoji-button">💼</div>
        </div>
      </section>
      <div
        className="flex w-full justify-center items-center min-h-[280px]"
        data-freestar-ad="__336x280 __970x250"
        id="getemoji.com_incontent_1_v3"
        data-ad-name="getemoji.com_incontent_1_v3"
        data-google-query-id="CM2Bg9_tmpcDFa-GzgEduD4zMg"
      >
        <div
          id="google_ads_iframe_/21872898416/FS_getemoji_com_incontent_1_0__container__"
          style={{ border: "0pt", width: "468px", height: "0px" }}
        >
          <div className="__fs-ancillary" style={{ visibility: "hidden" }}>
            <div className="__fs-branding">
              <a
                href="https://ads.freestar.com/?utm_campaign=branding&amp;utm_medium=display&amp;utm_source=getemoji.com&amp;utm_content=getemoji.com_incontent_1_v3"
                target="_blank"
                rel="noreferrer"
                ><img
                  src="https://a.pub.network/core/imgs/fslogo-green.svg"
                  alt="freestar"
                  width="14"
                  height="14"
              /></a>
            </div>
            <div className="fs-branding-spacer"></div>
          </div>
        </div>
      </div>
      <section className="flex flex-col w-auto gap-4 mx-auto md:mx-0">
        <h2>
          <a
            title="List of light skin tone emojis"
            href="https://emojipedia.org/light-skin-tone"
            target="_blank"
            >Pale Emojis</a
          >
        </h2>
        <div className="flex flex-wrap">
          <div className="emoji emoji-button">👋🏻</div>
          <div className="emoji emoji-button">🤚🏻</div>
          <div className="emoji emoji-button">🖐🏻</div>
          <div className="emoji emoji-button">✋🏻</div>
          <div className="emoji emoji-button">🖖🏻</div>
          <div className="emoji emoji-button">👌🏻</div>
          <div className="emoji emoji-button">🤌🏻</div>
          <div className="emoji emoji-button">🤏🏻</div>
          <div className="emoji emoji-button">✌🏻</div>
          <div className="emoji emoji-button">🤞🏻</div>
          <div className="emoji emoji-button">🫰🏻</div>
          <div className="emoji emoji-button">🤟🏻</div>
          <div className="emoji emoji-button">🤘🏻</div>
          <div className="emoji emoji-button">🤙🏻</div>
          <div className="emoji emoji-button">🫵🏻</div>
          <div className="emoji emoji-button">🫱🏻</div>
          <div className="emoji emoji-button">🫲🏻</div>
          <div className="emoji emoji-button">🫸🏻</div>
          <div className="emoji emoji-button">🫷🏻</div>
          <div className="emoji emoji-button">🫳🏻</div>
          <div className="emoji emoji-button">🫴🏻</div>
          <div className="emoji emoji-button">👈🏻</div>
          <div className="emoji emoji-button">👉🏻</div>
          <div className="emoji emoji-button">👆🏻</div>
          <div className="emoji emoji-button">🖕🏻</div>
          <div className="emoji emoji-button">👇🏻</div>
          <div className="emoji emoji-button">☝🏻</div>
          <div className="emoji emoji-button">👍🏻</div>
          <div className="emoji emoji-button">👎🏻</div>
          <div className="emoji emoji-button">✊🏻</div>
          <div className="emoji emoji-button">👊🏻</div>
          <div className="emoji emoji-button">🤛🏻</div>
          <div className="emoji emoji-button">🤜🏻</div>
          <div className="emoji emoji-button">👏🏻</div>
          <div className="emoji emoji-button">🫶🏻</div>
          <div className="emoji emoji-button">🙌🏻</div>
          <div className="emoji emoji-button">👐🏻</div>
          <div className="emoji emoji-button">🤲🏻</div>
          <div className="emoji emoji-button">🙏🏻</div>
          <div className="emoji emoji-button">✍🏻</div>
          <div className="emoji emoji-button">💅🏻</div>
          <div className="emoji emoji-button">🤳🏻</div>
          <div className="emoji emoji-button">💪🏻</div>
          <div className="emoji emoji-button">🦵🏻</div>
          <div className="emoji emoji-button">🦶🏻</div>
          <div className="emoji emoji-button">👂🏻</div>
          <div className="emoji emoji-button">🦻🏻</div>
          <div className="emoji emoji-button">👃🏻</div>
          <div className="emoji emoji-button">👶🏻</div>
          <div className="emoji emoji-button">👧🏻</div>
          <div className="emoji emoji-button">🧒🏻</div>
          <div className="emoji emoji-button">👦🏻</div>
          <div className="emoji emoji-button">👩🏻</div>
          <div className="emoji emoji-button">🧑🏻</div>
          <div className="emoji emoji-button">👨🏻</div>
          <div className="emoji emoji-button">👩🏻‍🦱</div>
          <div className="emoji emoji-button">🧑🏻‍🦱</div>
          <div className="emoji emoji-button">👨🏻‍🦱</div>
          <div className="emoji emoji-button">👩🏻‍🦰</div>
          <div className="emoji emoji-button">🧑🏻‍🦰</div>
          <div className="emoji emoji-button">👨🏻‍🦰</div>
          <div className="emoji emoji-button">👱🏻‍♀️</div>
          <div className="emoji emoji-button">👱🏻</div>
          <div className="emoji emoji-button">👱🏻‍♂️</div>
          <div className="emoji emoji-button">👩🏻‍🦳</div>
          <div className="emoji emoji-button">🧑🏻‍🦳</div>
          <div className="emoji emoji-button">👨🏻‍🦳</div>
          <div className="emoji emoji-button">👩🏻‍🦲</div>
          <div className="emoji emoji-button">🧑🏻‍🦲</div>
          <div className="emoji emoji-button">👨🏻‍🦲</div>
          <div className="emoji emoji-button">🧔🏻‍♀️</div>
          <div className="emoji emoji-button">🧔🏻</div>
          <div className="emoji emoji-button">🧔🏻‍♂️</div>
          <div className="emoji emoji-button">👵🏻</div>
          <div className="emoji emoji-button">🧓🏻</div>
          <div className="emoji emoji-button">👴🏻</div>
          <div className="emoji emoji-button">👲🏻</div>
          <div className="emoji emoji-button">👳🏻‍♀️</div>
          <div className="emoji emoji-button">👳🏻</div>
          <div className="emoji emoji-button">👳🏻‍♂️</div>
          <div className="emoji emoji-button">🧕🏻</div>
          <div className="emoji emoji-button">👮🏻‍♀️</div>
          <div className="emoji emoji-button">👮🏻</div>
          <div className="emoji emoji-button">👮🏻‍♂️</div>
          <div className="emoji emoji-button">👷🏻‍♀️</div>
          <div className="emoji emoji-button">👷🏻</div>
          <div className="emoji emoji-button">👷🏻‍♂️</div>
          <div className="emoji emoji-button">💂🏻‍♀️</div>
          <div className="emoji emoji-button">💂🏻</div>
          <div className="emoji emoji-button">💂🏻‍♂️</div>
          <div className="emoji emoji-button">🕵🏻‍♀️</div>
          <div className="emoji emoji-button">🕵🏻</div>
          <div className="emoji emoji-button">🕵🏻‍♂️</div>
          <div className="emoji emoji-button">👩🏻‍⚕️</div>
          <div className="emoji emoji-button">🧑🏻‍⚕️</div>
          <div className="emoji emoji-button">👨🏻‍⚕️</div>
          <div className="emoji emoji-button">👩🏻‍🌾</div>
          <div className="emoji emoji-button">🧑🏻‍🌾</div>
          <div className="emoji emoji-button">👨🏻‍🌾</div>
          <div className="emoji emoji-button">👩🏻‍🍳</div>
          <div className="emoji emoji-button">🧑🏻‍🍳</div>
          <div className="emoji emoji-button">👨🏻‍🍳</div>
          <div className="emoji emoji-button">👩🏻‍🎓</div>
          <div className="emoji emoji-button">🧑🏻‍🎓</div>
          <div className="emoji emoji-button">👨🏻‍🎓</div>
          <div className="emoji emoji-button">👩🏻‍🎤</div>
          <div className="emoji emoji-button">🧑🏻‍🎤</div>
          <div className="emoji emoji-button">👨🏻‍🎤</div>
          <div className="emoji emoji-button">👩🏻‍🏫</div>
          <div className="emoji emoji-button">🧑🏻‍🏫</div>
          <div className="emoji emoji-button">👨🏻‍🏫</div>
          <div className="emoji emoji-button">👩🏻‍🏭</div>
          <div className="emoji emoji-button">🧑🏻‍🏭</div>
          <div className="emoji emoji-button">👨🏻‍🏭</div>
          <div className="emoji emoji-button">👩🏻‍💻</div>
          <div className="emoji emoji-button">🧑🏻‍💻</div>
          <div className="emoji emoji-button">👨🏻‍💻</div>
          <div className="emoji emoji-button">👩🏻‍💼</div>
          <div className="emoji emoji-button">🧑🏻‍💼</div>
          <div className="emoji emoji-button">👨🏻‍💼</div>
          <div className="emoji emoji-button">👩🏻‍🔧</div>
          <div className="emoji emoji-button">🧑🏻‍🔧</div>
          <div className="emoji emoji-button">👨🏻‍🔧</div>
          <div className="emoji emoji-button">👩🏻‍🔬</div>
          <div className="emoji emoji-button">🧑🏻‍🔬</div>
          <div className="emoji emoji-button">👨🏻‍🔬</div>
          <div className="emoji emoji-button">👩🏻‍🎨</div>
          <div className="emoji emoji-button">🧑🏻‍🎨</div>
          <div className="emoji emoji-button">👨🏻‍🎨</div>
          <div className="emoji emoji-button">👩🏻‍🚒</div>
          <div className="emoji emoji-button">🧑🏻‍🚒</div>
          <div className="emoji emoji-button">👨🏻‍🚒</div>
          <div className="emoji emoji-button">👩🏻‍✈️</div>
          <div className="emoji emoji-button">🧑🏻‍✈️</div>
          <div className="emoji emoji-button">👨🏻‍✈️</div>
          <div className="emoji emoji-button">👩🏻‍🚀</div>
          <div className="emoji emoji-button">🧑🏻‍🚀</div>
          <div className="emoji emoji-button">👨🏻‍🚀</div>
          <div className="emoji emoji-button">👩🏻‍⚖️</div>
          <div className="emoji emoji-button">🧑🏻‍⚖️</div>
          <div className="emoji emoji-button">👨🏻‍⚖️</div>
          <div className="emoji emoji-button">👰🏻‍♀️</div>
          <div className="emoji emoji-button">👰🏻</div>
          <div className="emoji emoji-button">👰🏻‍♂️</div>
          <div className="emoji emoji-button">🤵🏻‍♀️</div>
          <div className="emoji emoji-button">🤵🏻</div>
          <div className="emoji emoji-button">🤵🏻‍♂️</div>
          <div className="emoji emoji-button">👸🏻</div>
          <div className="emoji emoji-button">🫅🏻</div>
          <div className="emoji emoji-button">🤴🏻</div>
          <div className="emoji emoji-button">🥷🏻</div>
          <div className="emoji emoji-button">🦸🏻‍♀️</div>
          <div className="emoji emoji-button">🦸🏻</div>
          <div className="emoji emoji-button">🦸🏻‍♂️</div>
          <div className="emoji emoji-button">🦹🏻‍♀️</div>
          <div className="emoji emoji-button">🦹🏻</div>
          <div className="emoji emoji-button">🦹🏻‍♂️</div>
          <div className="emoji emoji-button">🤶🏻</div>
          <div className="emoji emoji-button">🧑🏻‍🎄</div>
          <div className="emoji emoji-button">🎅🏻</div>
          <div className="emoji emoji-button">🧙🏻‍♀️</div>
          <div className="emoji emoji-button">🧙🏻</div>
          <div className="emoji emoji-button">🧙🏻‍♂️</div>
          <div className="emoji emoji-button">🧝🏻‍♀️</div>
          <div className="emoji emoji-button">🧝🏻</div>
          <div className="emoji emoji-button">🧝🏻‍♂️</div>
          <div className="emoji emoji-button">🧛🏻‍♀️</div>
          <div className="emoji emoji-button">🧛🏻</div>
          <div className="emoji emoji-button">🧛🏻‍♂️</div>
          <div className="emoji emoji-button">🧜🏻‍♀️</div>
          <div className="emoji emoji-button">🧜🏻</div>
          <div className="emoji emoji-button">🧜🏻‍♂️</div>
          <div className="emoji emoji-button">🧚🏻‍♀️</div>
          <div className="emoji emoji-button">🧚🏻</div>
          <div className="emoji emoji-button">🧚🏻‍♂️</div>
          <div className="emoji emoji-button">👼🏻</div>
          <div className="emoji emoji-button">🤰🏻</div>
          <div className="emoji emoji-button">🫄🏻</div>
          <div className="emoji emoji-button">🫃🏻</div>
          <div className="emoji emoji-button">🤱🏻</div>
          <div className="emoji emoji-button">👩🏻‍🍼</div>
          <div className="emoji emoji-button">🧑🏻‍🍼</div>
          <div className="emoji emoji-button">👨🏻‍🍼</div>
          <div className="emoji emoji-button">🙇🏻‍♀️</div>
          <div className="emoji emoji-button">🙇🏻</div>
          <div className="emoji emoji-button">🙇🏻‍♂️</div>
          <div className="emoji emoji-button">💁🏻‍♀️</div>
          <div className="emoji emoji-button">💁🏻</div>
          <div className="emoji emoji-button">💁🏻‍♂️</div>
          <div className="emoji emoji-button">🙅🏻‍♀️</div>
          <div className="emoji emoji-button">🙅🏻</div>
          <div className="emoji emoji-button">🙅🏻‍♂️</div>
          <div className="emoji emoji-button">🙆🏻‍♀️</div>
          <div className="emoji emoji-button">🙆🏻</div>
          <div className="emoji emoji-button">🙆🏻‍♂️</div>
          <div className="emoji emoji-button">🙋🏻‍♀️</div>
          <div className="emoji emoji-button">🙋🏻</div>
          <div className="emoji emoji-button">🙋🏻‍♂️</div>
          <div className="emoji emoji-button">🧏🏻‍♀️</div>
          <div className="emoji emoji-button">🧏🏻</div>
          <div className="emoji emoji-button">🧏🏻‍♂️</div>
          <div className="emoji emoji-button">🤦🏻‍♀️</div>
          <div className="emoji emoji-button">🤦🏻</div>
          <div className="emoji emoji-button">🤦🏻‍♂️</div>
          <div className="emoji emoji-button">🤷🏻‍♀️</div>
          <div className="emoji emoji-button">🤷🏻</div>
          <div className="emoji emoji-button">🤷🏻‍♂️</div>
          <div className="emoji emoji-button">🙎🏻‍♀️</div>
          <div className="emoji emoji-button">🙎🏻</div>
          <div className="emoji emoji-button">🙎🏻‍♂️</div>
          <div className="emoji emoji-button">🙍🏻‍♀️</div>
          <div className="emoji emoji-button">🙍🏻</div>
          <div className="emoji emoji-button">🙍🏻‍♂️</div>
          <div className="emoji emoji-button">💇🏻‍♀️</div>
          <div className="emoji emoji-button">💇🏻</div>
          <div className="emoji emoji-button">💇🏻‍♂️</div>
          <div className="emoji emoji-button">💆🏻‍♀️</div>
          <div className="emoji emoji-button">💆🏻</div>
          <div className="emoji emoji-button">💆🏻‍♂️</div>
          <div className="emoji emoji-button">🧖🏻‍♀️</div>
          <div className="emoji emoji-button">🧖🏻</div>
          <div className="emoji emoji-button">🧖🏻‍♂️</div>
          <div className="emoji emoji-button">🧑🏻‍🩰</div>
          <div className="emoji emoji-button">💃🏻</div>
          <div className="emoji emoji-button">🕺🏻</div>
          <div className="emoji emoji-button">🕴🏻</div>
          <div className="emoji emoji-button">👩🏻‍🦽</div>
          <div className="emoji emoji-button">👩🏻‍🦽‍➡️</div>
          <div className="emoji emoji-button">🧑🏻‍🦽</div>
          <div className="emoji emoji-button">🧑🏻‍🦽‍➡️</div>
          <div className="emoji emoji-button">👨🏻‍🦽</div>
          <div className="emoji emoji-button">👨🏻‍🦽‍➡️</div>
          <div className="emoji emoji-button">👩🏻‍🦼</div>
          <div className="emoji emoji-button">👩🏻‍🦼‍➡️</div>
          <div className="emoji emoji-button">🧑🏻‍🦼</div>
          <div className="emoji emoji-button">🧑🏻‍🦼‍➡️</div>
          <div className="emoji emoji-button">👨🏻‍🦼</div>
          <div className="emoji emoji-button">👨🏻‍🦼‍➡️</div>
          <div className="emoji emoji-button">🚶🏻‍♀️</div>
          <div className="emoji emoji-button">🚶🏻‍♀️‍➡️</div>
          <div className="emoji emoji-button">🚶🏻</div>
          <div className="emoji emoji-button">🚶🏻‍➡️</div>
          <div className="emoji emoji-button">🚶🏻‍♂️</div>
          <div className="emoji emoji-button">🚶🏻‍♂️‍➡️</div>
          <div className="emoji emoji-button">👩🏻‍🦯</div>
          <div className="emoji emoji-button">👩🏻‍🦯‍➡️</div>
          <div className="emoji emoji-button">🧑🏻‍🦯</div>
          <div className="emoji emoji-button">🧑🏻‍🦯‍➡️</div>
          <div className="emoji emoji-button">👨🏻‍🦯</div>
          <div className="emoji emoji-button">👨🏻‍🦯‍➡️</div>
          <div className="emoji emoji-button">🧎🏻‍♀️</div>
          <div className="emoji emoji-button">🧎🏻‍♀️‍➡️</div>
          <div className="emoji emoji-button">🧎🏻</div>
          <div className="emoji emoji-button">🧎🏻‍➡️</div>
          <div className="emoji emoji-button">🧎🏻‍♂️</div>
          <div className="emoji emoji-button">🧎🏻‍♂️‍➡️</div>
          <div className="emoji emoji-button">🏃🏻‍♀️</div>
          <div className="emoji emoji-button">🏃🏻‍♀️‍➡️</div>
          <div className="emoji emoji-button">🏃🏻</div>
          <div className="emoji emoji-button">🏃🏻‍➡️</div>
          <div className="emoji emoji-button">🏃🏻‍♂️</div>
          <div className="emoji emoji-button">🏃🏻‍♂️‍➡️</div>
          <div className="emoji emoji-button">🧍🏻‍♀️</div>
          <div className="emoji emoji-button">🧍🏻</div>
          <div className="emoji emoji-button">🧍🏻‍♂️</div>
          <div className="emoji emoji-button">👭🏻</div>
          <div className="emoji emoji-button">🧑🏻‍🤝‍🧑🏻</div>
          <div className="emoji emoji-button">👬🏻</div>
          <div className="emoji emoji-button">👫🏻</div>
          <div className="emoji emoji-button">🧗🏻‍♀️</div>
          <div className="emoji emoji-button">🧗🏻</div>
          <div className="emoji emoji-button">🧗🏻‍♂️</div>
          <div className="emoji emoji-button">🏇🏻</div>
          <div className="emoji emoji-button">🏂🏻</div>
          <div className="emoji emoji-button">🏌🏻‍♀️</div>
          <div className="emoji emoji-button">🏌🏻</div>
          <div className="emoji emoji-button">🏌🏻‍♂️</div>
          <div className="emoji emoji-button">🏄🏻‍♀️</div>
          <div className="emoji emoji-button">🏄🏻</div>
          <div className="emoji emoji-button">🏄🏻‍♂️</div>
          <div className="emoji emoji-button">🚣🏻‍♀️</div>
          <div className="emoji emoji-button">🚣🏻</div>
          <div className="emoji emoji-button">🚣🏻‍♂️</div>
          <div className="emoji emoji-button">🏊🏻‍♀️</div>
          <div className="emoji emoji-button">🏊🏻</div>
          <div className="emoji emoji-button">🏊🏻‍♂️</div>
          <div className="emoji emoji-button">⛹🏻‍♀️</div>
          <div className="emoji emoji-button">⛹🏻</div>
          <div className="emoji emoji-button">⛹🏻‍♂️</div>
          <div className="emoji emoji-button">🏋🏻‍♀️</div>
          <div className="emoji emoji-button">🏋🏻</div>
          <div className="emoji emoji-button">🏋🏻‍♂️</div>
          <div className="emoji emoji-button">🚴🏻‍♀️</div>
          <div className="emoji emoji-button">🚴🏻</div>
          <div className="emoji emoji-button">🚴🏻‍♂️</div>
          <div className="emoji emoji-button">🚵🏻‍♀️</div>
          <div className="emoji emoji-button">🚵🏻</div>
          <div className="emoji emoji-button">🚵🏻‍♂️</div>
          <div className="emoji emoji-button">🤸🏻‍♀️</div>
          <div className="emoji emoji-button">🤸🏻</div>
          <div className="emoji emoji-button">🤸🏻‍♂️</div>
          <div className="emoji emoji-button">🤽🏻‍♀️</div>
          <div className="emoji emoji-button">🤽🏻</div>
          <div className="emoji emoji-button">🤽🏻‍♂️</div>
          <div className="emoji emoji-button">🤾🏻‍♀️</div>
          <div className="emoji emoji-button">🤾🏻</div>
          <div className="emoji emoji-button">🤾🏻‍♂️</div>
          <div className="emoji emoji-button">🤹🏻‍♀️</div>
          <div className="emoji emoji-button">🤹🏻</div>
          <div className="emoji emoji-button">🤹🏻‍♂️</div>
          <div className="emoji emoji-button">🧘🏻‍♀️</div>
          <div className="emoji emoji-button">🧘🏻</div>
          <div className="emoji emoji-button">🧘🏻‍♂️</div>
          <div className="emoji emoji-button">🛀🏻</div>
          <div className="emoji emoji-button">🛌🏻</div>
        </div>
      </section>
      <section className="flex flex-col w-auto gap-4 mx-auto md:mx-0">
        <h2>
          <a
            title="List of medium light skin tone emojis"
            href="https://emojipedia.org/medium-light-skin-tone"
            target="_blank"
            >Cream White Emojis</a
          >
        </h2>
        <div className="flex flex-wrap">
          <div className="emoji emoji-button">👋🏼</div>
          <div className="emoji emoji-button">🤚🏼</div>
          <div className="emoji emoji-button">🖐🏼</div>
          <div className="emoji emoji-button">✋🏼</div>
          <div className="emoji emoji-button">🖖🏼</div>
          <div className="emoji emoji-button">👌🏼</div>
          <div className="emoji emoji-button">🤌🏼</div>
          <div className="emoji emoji-button">🤏🏼</div>
          <div className="emoji emoji-button">✌🏼</div>
          <div className="emoji emoji-button">🤞🏼</div>
          <div className="emoji emoji-button">🫰🏼</div>
          <div className="emoji emoji-button">🤟🏼</div>
          <div className="emoji emoji-button">🤘🏼</div>
          <div className="emoji emoji-button">🤙🏼</div>
          <div className="emoji emoji-button">🫵🏼</div>
          <div className="emoji emoji-button">🫱🏼</div>
          <div className="emoji emoji-button">🫲🏼</div>
          <div className="emoji emoji-button">🫸🏼</div>
          <div className="emoji emoji-button">🫷🏼</div>
          <div className="emoji emoji-button">🫳🏼</div>
          <div className="emoji emoji-button">🫴🏼</div>
          <div className="emoji emoji-button">👈🏼</div>
          <div className="emoji emoji-button">👉🏼</div>
          <div className="emoji emoji-button">👆🏼</div>
          <div className="emoji emoji-button">🖕🏼</div>
          <div className="emoji emoji-button">👇🏼</div>
          <div className="emoji emoji-button">☝🏼</div>
          <div className="emoji emoji-button">👍🏼</div>
          <div className="emoji emoji-button">👎🏼</div>
          <div className="emoji emoji-button">✊🏼</div>
          <div className="emoji emoji-button">👊🏼</div>
          <div className="emoji emoji-button">🤛🏼</div>
          <div className="emoji emoji-button">🤜🏼</div>
          <div className="emoji emoji-button">👏🏼</div>
          <div className="emoji emoji-button">🫶🏼</div>
          <div className="emoji emoji-button">🙌🏼</div>
          <div className="emoji emoji-button">👐🏼</div>
          <div className="emoji emoji-button">🤲🏼</div>
          <div className="emoji emoji-button">🙏🏼</div>
          <div className="emoji emoji-button">✍🏼</div>
          <div className="emoji emoji-button">💅🏼</div>
          <div className="emoji emoji-button">🤳🏼</div>
          <div className="emoji emoji-button">💪🏼</div>
          <div className="emoji emoji-button">🦵🏼</div>
          <div className="emoji emoji-button">🦶🏼</div>
          <div className="emoji emoji-button">👂🏼</div>
          <div className="emoji emoji-button">🦻🏼</div>
          <div className="emoji emoji-button">👃🏼</div>
          <div className="emoji emoji-button">👶🏼</div>
          <div className="emoji emoji-button">👧🏼</div>
          <div className="emoji emoji-button">🧒🏼</div>
          <div className="emoji emoji-button">👦🏼</div>
          <div className="emoji emoji-button">👩🏼</div>
          <div className="emoji emoji-button">🧑🏼</div>
          <div className="emoji emoji-button">👨🏼</div>
          <div className="emoji emoji-button">👩🏼‍🦱</div>
          <div className="emoji emoji-button">🧑🏼‍🦱</div>
          <div className="emoji emoji-button">👨🏼‍🦱</div>
          <div className="emoji emoji-button">👩🏼‍🦰</div>
          <div className="emoji emoji-button">🧑🏼‍🦰</div>
          <div className="emoji emoji-button">👨🏼‍🦰</div>
          <div className="emoji emoji-button">👱🏼‍♀️</div>
          <div className="emoji emoji-button">👱🏼</div>
          <div className="emoji emoji-button">👱🏼‍♂️</div>
          <div className="emoji emoji-button">👩🏼‍🦳</div>
          <div className="emoji emoji-button">🧑🏼‍🦳</div>
          <div className="emoji emoji-button">👨🏼‍🦳</div>
          <div className="emoji emoji-button">👩🏼‍🦲</div>
          <div className="emoji emoji-button">🧑🏼‍🦲</div>
          <div className="emoji emoji-button">👨🏼‍🦲</div>
          <div className="emoji emoji-button">🧔🏼‍♀️</div>
          <div className="emoji emoji-button">🧔🏼</div>
          <div className="emoji emoji-button">🧔🏼‍♂️</div>
          <div className="emoji emoji-button">👵🏼</div>
          <div className="emoji emoji-button">🧓🏼</div>
          <div className="emoji emoji-button">👴🏼</div>
          <div className="emoji emoji-button">👲🏼</div>
          <div className="emoji emoji-button">👳🏼‍♀️</div>
          <div className="emoji emoji-button">👳🏼</div>
          <div className="emoji emoji-button">👳🏼‍♂️</div>
          <div className="emoji emoji-button">🧕🏼</div>
          <div className="emoji emoji-button">👮🏼‍♀️</div>
          <div className="emoji emoji-button">👮🏼</div>
          <div className="emoji emoji-button">👮🏼‍♂️</div>
          <div className="emoji emoji-button">👷🏼‍♀️</div>
          <div className="emoji emoji-button">👷🏼</div>
          <div className="emoji emoji-button">👷🏼‍♂️</div>
          <div className="emoji emoji-button">💂🏼‍♀️</div>
          <div className="emoji emoji-button">💂🏼</div>
          <div className="emoji emoji-button">💂🏼‍♂️</div>
          <div className="emoji emoji-button">🕵🏼‍♀️</div>
          <div className="emoji emoji-button">🕵🏼</div>
          <div className="emoji emoji-button">🕵🏼‍♂️</div>
          <div className="emoji emoji-button">👩🏼‍⚕️</div>
          <div className="emoji emoji-button">🧑🏼‍⚕️</div>
          <div className="emoji emoji-button">👨🏼‍⚕️</div>
          <div className="emoji emoji-button">👩🏼‍🌾</div>
          <div className="emoji emoji-button">🧑🏼‍🌾</div>
          <div className="emoji emoji-button">👨🏼‍🌾</div>
          <div className="emoji emoji-button">👩🏼‍🍳</div>
          <div className="emoji emoji-button">🧑🏼‍🍳</div>
          <div className="emoji emoji-button">👨🏼‍🍳</div>
          <div className="emoji emoji-button">👩🏼‍🎓</div>
          <div className="emoji emoji-button">🧑🏼‍🎓</div>
          <div className="emoji emoji-button">👨🏼‍🎓</div>
          <div className="emoji emoji-button">👩🏼‍🎤</div>
          <div className="emoji emoji-button">🧑🏼‍🎤</div>
          <div className="emoji emoji-button">👨🏼‍🎤</div>
          <div className="emoji emoji-button">👩🏼‍🏫</div>
          <div className="emoji emoji-button">🧑🏼‍🏫</div>
          <div className="emoji emoji-button">👨🏼‍🏫</div>
          <div className="emoji emoji-button">👩🏼‍🏭</div>
          <div className="emoji emoji-button">🧑🏼‍🏭</div>
          <div className="emoji emoji-button">👨🏼‍🏭</div>
          <div className="emoji emoji-button">👩🏼‍💻</div>
          <div className="emoji emoji-button">🧑🏼‍💻</div>
          <div className="emoji emoji-button">👨🏼‍💻</div>
          <div className="emoji emoji-button">👩🏼‍💼</div>
          <div className="emoji emoji-button">🧑🏼‍💼</div>
          <div className="emoji emoji-button">👨🏼‍💼</div>
          <div className="emoji emoji-button">👩🏼‍🔧</div>
          <div className="emoji emoji-button">🧑🏼‍🔧</div>
          <div className="emoji emoji-button">👨🏼‍🔧</div>
          <div className="emoji emoji-button">👩🏼‍🔬</div>
          <div className="emoji emoji-button">🧑🏼‍🔬</div>
          <div className="emoji emoji-button">👨🏼‍🔬</div>
          <div className="emoji emoji-button">👩🏼‍🎨</div>
          <div className="emoji emoji-button">🧑🏼‍🎨</div>
          <div className="emoji emoji-button">👨🏼‍🎨</div>
          <div className="emoji emoji-button">👩🏼‍🚒</div>
          <div className="emoji emoji-button">🧑🏼‍🚒</div>
          <div className="emoji emoji-button">👨🏼‍🚒</div>
          <div className="emoji emoji-button">👩🏼‍✈️</div>
          <div className="emoji emoji-button">🧑🏼‍✈️</div>
          <div className="emoji emoji-button">👨🏼‍✈️</div>
          <div className="emoji emoji-button">👩🏼‍🚀</div>
          <div className="emoji emoji-button">🧑🏼‍🚀</div>
          <div className="emoji emoji-button">👨🏼‍🚀</div>
          <div className="emoji emoji-button">👩🏼‍⚖️</div>
          <div className="emoji emoji-button">🧑🏼‍⚖️</div>
          <div className="emoji emoji-button">👨🏼‍⚖️</div>
          <div className="emoji emoji-button">👰🏼‍♀️</div>
          <div className="emoji emoji-button">👰🏼</div>
          <div className="emoji emoji-button">👰🏼‍♂️</div>
          <div className="emoji emoji-button">🤵🏼‍♀️</div>
          <div className="emoji emoji-button">🤵🏼</div>
          <div className="emoji emoji-button">🤵🏼‍♂️</div>
          <div className="emoji emoji-button">👸🏼</div>
          <div className="emoji emoji-button">🫅🏼</div>
          <div className="emoji emoji-button">🤴🏼</div>
          <div className="emoji emoji-button">🥷🏼</div>
          <div className="emoji emoji-button">🦸🏼‍♀️</div>
          <div className="emoji emoji-button">🦸🏼</div>
          <div className="emoji emoji-button">🦸🏼‍♂️</div>
          <div className="emoji emoji-button">🦹🏼‍♀️</div>
          <div className="emoji emoji-button">🦹🏼</div>
          <div className="emoji emoji-button">🦹🏼‍♂️</div>
          <div className="emoji emoji-button">🤶🏼</div>
          <div className="emoji emoji-button">🧑🏼‍🎄</div>
          <div className="emoji emoji-button">🎅🏼</div>
          <div className="emoji emoji-button">🧙🏼‍♀️</div>
          <div className="emoji emoji-button">🧙🏼</div>
          <div className="emoji emoji-button">🧙🏼‍♂️</div>
          <div className="emoji emoji-button">🧝🏼‍♀️</div>
          <div className="emoji emoji-button">🧝🏼</div>
          <div className="emoji emoji-button">🧝🏼‍♂️</div>
          <div className="emoji emoji-button">🧛🏼‍♀️</div>
          <div className="emoji emoji-button">🧛🏼</div>
          <div className="emoji emoji-button">🧛🏼‍♂️</div>
          <div className="emoji emoji-button">🧜🏼‍♀️</div>
          <div className="emoji emoji-button">🧜🏼</div>
          <div className="emoji emoji-button">🧜🏼‍♂️</div>
          <div className="emoji emoji-button">🧚🏼‍♀️</div>
          <div className="emoji emoji-button">🧚🏼</div>
          <div className="emoji emoji-button">🧚🏼‍♂️</div>
          <div className="emoji emoji-button">👼🏼</div>
          <div className="emoji emoji-button">🤰🏼</div>
          <div className="emoji emoji-button">🫄🏼</div>
          <div className="emoji emoji-button">🫃🏼</div>
          <div className="emoji emoji-button">🤱🏼</div>
          <div className="emoji emoji-button">👩🏼‍🍼</div>
          <div className="emoji emoji-button">🧑🏼‍🍼</div>
          <div className="emoji emoji-button">👨🏼‍🍼</div>
          <div className="emoji emoji-button">🙇🏼‍♀️</div>
          <div className="emoji emoji-button">🙇🏼</div>
          <div className="emoji emoji-button">🙇🏼‍♂️</div>
          <div className="emoji emoji-button">💁🏼‍♀️</div>
          <div className="emoji emoji-button">💁🏼</div>
          <div className="emoji emoji-button">💁🏼‍♂️</div>
          <div className="emoji emoji-button">🙅🏼‍♀️</div>
          <div className="emoji emoji-button">🙅🏼</div>
          <div className="emoji emoji-button">🙅🏼‍♂️</div>
          <div className="emoji emoji-button">🙆🏼‍♀️</div>
          <div className="emoji emoji-button">🙆🏼</div>
          <div className="emoji emoji-button">🙆🏼‍♂️</div>
          <div className="emoji emoji-button">🙋🏼‍♀️</div>
          <div className="emoji emoji-button">🙋🏼</div>
          <div className="emoji emoji-button">🙋🏼‍♂️</div>
          <div className="emoji emoji-button">🧏🏼‍♀️</div>
          <div className="emoji emoji-button">🧏🏼</div>
          <div className="emoji emoji-button">🧏🏼‍♂️</div>
          <div className="emoji emoji-button">🤦🏼‍♀️</div>
          <div className="emoji emoji-button">🤦🏼</div>
          <div className="emoji emoji-button">🤦🏼‍♂️</div>
          <div className="emoji emoji-button">🤷🏼‍♀️</div>
          <div className="emoji emoji-button">🤷🏼</div>
          <div className="emoji emoji-button">🤷🏼‍♂️</div>
          <div className="emoji emoji-button">🙎🏼‍♀️</div>
          <div className="emoji emoji-button">🙎🏼</div>
          <div className="emoji emoji-button">🙎🏼‍♂️</div>
          <div className="emoji emoji-button">🙍🏼‍♀️</div>
          <div className="emoji emoji-button">🙍🏼</div>
          <div className="emoji emoji-button">🙍🏼‍♂️</div>
          <div className="emoji emoji-button">💇🏼‍♀️</div>
          <div className="emoji emoji-button">💇🏼</div>
          <div className="emoji emoji-button">💇🏼‍♂️</div>
          <div className="emoji emoji-button">💆🏼‍♀️</div>
          <div className="emoji emoji-button">💆🏼</div>
          <div className="emoji emoji-button">💆🏼‍♂️</div>
          <div className="emoji emoji-button">🧖🏼‍♀️</div>
          <div className="emoji emoji-button">🧖🏼</div>
          <div className="emoji emoji-button">🧖🏼‍♂️</div>
          <div className="emoji emoji-button">🧑🏼‍🩰</div>
          <div className="emoji emoji-button">💃🏼</div>
          <div className="emoji emoji-button">🕺🏼</div>
          <div className="emoji emoji-button">🕴🏼</div>
          <div className="emoji emoji-button">👩🏼‍🦽</div>
          <div className="emoji emoji-button">👩🏼‍🦽‍➡️</div>
          <div className="emoji emoji-button">🧑🏼‍🦽</div>
          <div className="emoji emoji-button">🧑🏼‍🦽‍➡️</div>
          <div className="emoji emoji-button">👨🏼‍🦽</div>
          <div className="emoji emoji-button">👨🏼‍🦽‍➡️</div>
          <div className="emoji emoji-button">👩🏼‍🦼</div>
          <div className="emoji emoji-button">👩🏼‍🦼‍➡️</div>
          <div className="emoji emoji-button">🧑🏼‍🦼</div>
          <div className="emoji emoji-button">🧑🏼‍🦼‍➡️</div>
          <div className="emoji emoji-button">👨🏼‍🦼</div>
          <div className="emoji emoji-button">👨🏼‍🦼‍➡️</div>
          <div className="emoji emoji-button">🚶🏼‍♀️</div>
          <div className="emoji emoji-button">🚶🏼‍♀️‍➡️</div>
          <div className="emoji emoji-button">🚶🏼</div>
          <div className="emoji emoji-button">🚶🏼‍➡️</div>
          <div className="emoji emoji-button">🚶🏼‍♂️</div>
          <div className="emoji emoji-button">🚶🏼‍♂️‍➡️</div>
          <div className="emoji emoji-button">👩🏼‍🦯</div>
          <div className="emoji emoji-button">👩🏼‍🦯‍➡️</div>
          <div className="emoji emoji-button">🧑🏼‍🦯</div>
          <div className="emoji emoji-button">🧑🏼‍🦯‍➡️</div>
          <div className="emoji emoji-button">👨🏼‍🦯</div>
          <div className="emoji emoji-button">👨🏼‍🦯‍➡️</div>
          <div className="emoji emoji-button">🧎🏼‍♀️</div>
          <div className="emoji emoji-button">🧎🏼‍♀️‍➡️</div>
          <div className="emoji emoji-button">🧎🏼</div>
          <div className="emoji emoji-button">🧎🏼‍➡️</div>
          <div className="emoji emoji-button">🧎🏼‍♂️</div>
          <div className="emoji emoji-button">🧎🏼‍♂️‍➡️</div>
          <div className="emoji emoji-button">🏃🏼‍♀️</div>
          <div className="emoji emoji-button">🏃🏼‍♀️‍➡️</div>
          <div className="emoji emoji-button">🏃🏼</div>
          <div className="emoji emoji-button">🏃🏼‍➡️</div>
          <div className="emoji emoji-button">🏃🏼‍♂️</div>
          <div className="emoji emoji-button">🏃🏼‍♂️‍➡️</div>
          <div className="emoji emoji-button">🧍🏼‍♀️</div>
          <div className="emoji emoji-button">🧍🏼</div>
          <div className="emoji emoji-button">🧍🏼‍♂️</div>
          <div className="emoji emoji-button">👭🏼</div>
          <div className="emoji emoji-button">🧑🏼‍🤝‍🧑🏼</div>
          <div className="emoji emoji-button">👬🏼</div>
          <div className="emoji emoji-button">👫🏼</div>
          <div className="emoji emoji-button">🧗🏼‍♀️</div>
          <div className="emoji emoji-button">🧗🏼</div>
          <div className="emoji emoji-button">🧗🏼‍♂️</div>
          <div className="emoji emoji-button">🏇🏼</div>
          <div className="emoji emoji-button">🏂🏼</div>
          <div className="emoji emoji-button">🏌🏼‍♀️</div>
          <div className="emoji emoji-button">🏌🏼</div>
          <div className="emoji emoji-button">🏌🏼‍♂️</div>
          <div className="emoji emoji-button">🏄🏼‍♀️</div>
          <div className="emoji emoji-button">🏄🏼</div>
          <div className="emoji emoji-button">🏄🏼‍♂️</div>
          <div className="emoji emoji-button">🚣🏼‍♀️</div>
          <div className="emoji emoji-button">🚣🏼</div>
          <div className="emoji emoji-button">🚣🏼‍♂️</div>
          <div className="emoji emoji-button">🏊🏼‍♀️</div>
          <div className="emoji emoji-button">🏊🏼</div>
          <div className="emoji emoji-button">🏊🏼‍♂️</div>
          <div className="emoji emoji-button">⛹🏼‍♀️</div>
          <div className="emoji emoji-button">⛹🏼</div>
          <div className="emoji emoji-button">⛹🏼‍♂️</div>
          <div className="emoji emoji-button">🏋🏼‍♀️</div>
          <div className="emoji emoji-button">🏋🏼</div>
          <div className="emoji emoji-button">🏋🏼‍♂️</div>
          <div className="emoji emoji-button">🚴🏼‍♀️</div>
          <div className="emoji emoji-button">🚴🏼</div>
          <div className="emoji emoji-button">🚴🏼‍♂️</div>
          <div className="emoji emoji-button">🚵🏼‍♀️</div>
          <div className="emoji emoji-button">🚵🏼</div>
          <div className="emoji emoji-button">🚵🏼‍♂️</div>
          <div className="emoji emoji-button">🤸🏼‍♀️</div>
          <div className="emoji emoji-button">🤸🏼</div>
          <div className="emoji emoji-button">🤸🏼‍♂️</div>
          <div className="emoji emoji-button">🤽🏼‍♀️</div>
          <div className="emoji emoji-button">🤽🏼</div>
          <div className="emoji emoji-button">🤽🏼‍♂️</div>
          <div className="emoji emoji-button">🤾🏼‍♀️</div>
          <div className="emoji emoji-button">🤾🏼</div>
          <div className="emoji emoji-button">🤾🏼‍♂️</div>
          <div className="emoji emoji-button">🤹🏼‍♀️</div>
          <div className="emoji emoji-button">🤹🏼</div>
          <div className="emoji emoji-button">🤹🏼‍♂️</div>
          <div className="emoji emoji-button">🧘🏼‍♀️</div>
          <div className="emoji emoji-button">🧘🏼</div>
          <div className="emoji emoji-button">🧘🏼‍♂️</div>
          <div className="emoji emoji-button">🛀🏼</div>
          <div className="emoji emoji-button">🛌🏼</div>
        </div>
      </section>
      <div
        className="flex w-full justify-center items-center min-h-[280px]"
        data-freestar-ad="__336x280 __970x250"
        id="getemoji.com_incontent_2_v3"
        data-ad-name="getemoji.com_incontent_2_v3"
        data-google-query-id="CM6Bg9_tmpcDFa-GzgEduD4zMg"
      >
        <div
          id="google_ads_iframe_/21872898416/FS_getemoji_com_incontent_2_0__container__"
          style={{ border: "0pt", width: "468px", height: "0px" }}
        >
          <div className="__fs-ancillary" style={{ visibility: "hidden" }}>
            <div className="__fs-branding">
              <a
                href="https://ads.freestar.com/?utm_campaign=branding&amp;utm_medium=display&amp;utm_source=getemoji.com&amp;utm_content=getemoji.com_incontent_2_v3"
                target="_blank"
                rel="noreferrer"
                ><img
                  src="https://a.pub.network/core/imgs/fslogo-green.svg"
                  alt="freestar"
                  width="14"
                  height="14"
              /></a>
            </div>
            <div className="fs-branding-spacer"></div>
          </div>
        </div>
      </div>
      <section className="flex flex-col w-auto gap-4 mx-auto md:mx-0">
        <h2>
          <a
            title="List of medium skin tone emojis"
            href="https://emojipedia.org/medium-skin-tone"
            target="_blank"
            >Brown Emojis</a
          >
        </h2>
        <div className="flex flex-wrap">
          <div className="emoji emoji-button">👋🏽</div>
          <div className="emoji emoji-button">🤚🏽</div>
          <div className="emoji emoji-button">🖐🏽</div>
          <div className="emoji emoji-button">✋🏽</div>
          <div className="emoji emoji-button">🖖🏽</div>
          <div className="emoji emoji-button">👌🏽</div>
          <div className="emoji emoji-button">🤌🏽</div>
          <div className="emoji emoji-button">🤏🏽</div>
          <div className="emoji emoji-button">✌🏽</div>
          <div className="emoji emoji-button">🤞🏽</div>
          <div className="emoji emoji-button">🫰🏽</div>
          <div className="emoji emoji-button">🤟🏽</div>
          <div className="emoji emoji-button">🤘🏽</div>
          <div className="emoji emoji-button">🤙🏽</div>
          <div className="emoji emoji-button">🫵🏽</div>
          <div className="emoji emoji-button">🫱🏽</div>
          <div className="emoji emoji-button">🫲🏽</div>
          <div className="emoji emoji-button">🫸🏽</div>
          <div className="emoji emoji-button">🫷🏽</div>
          <div className="emoji emoji-button">🫳🏽</div>
          <div className="emoji emoji-button">🫴🏽</div>
          <div className="emoji emoji-button">👈🏽</div>
          <div className="emoji emoji-button">👉🏽</div>
          <div className="emoji emoji-button">👆🏽</div>
          <div className="emoji emoji-button">🖕🏽</div>
          <div className="emoji emoji-button">👇🏽</div>
          <div className="emoji emoji-button">☝🏽</div>
          <div className="emoji emoji-button">👍🏽</div>
          <div className="emoji emoji-button">👎🏽</div>
          <div className="emoji emoji-button">✊🏽</div>
          <div className="emoji emoji-button">👊🏽</div>
          <div className="emoji emoji-button">🤛🏽</div>
          <div className="emoji emoji-button">🤜🏽</div>
          <div className="emoji emoji-button">👏🏽</div>
          <div className="emoji emoji-button">🫶🏽</div>
          <div className="emoji emoji-button">🙌🏽</div>
          <div className="emoji emoji-button">👐🏽</div>
          <div className="emoji emoji-button">🤲🏽</div>
          <div className="emoji emoji-button">🙏🏽</div>
          <div className="emoji emoji-button">✍🏽</div>
          <div className="emoji emoji-button">💅🏽</div>
          <div className="emoji emoji-button">🤳🏽</div>
          <div className="emoji emoji-button">💪🏽</div>
          <div className="emoji emoji-button">🦵🏽</div>
          <div className="emoji emoji-button">🦶🏽</div>
          <div className="emoji emoji-button">👂🏽</div>
          <div className="emoji emoji-button">🦻🏽</div>
          <div className="emoji emoji-button">👃🏽</div>
          <div className="emoji emoji-button">👶🏽</div>
          <div className="emoji emoji-button">👧🏽</div>
          <div className="emoji emoji-button">🧒🏽</div>
          <div className="emoji emoji-button">👦🏽</div>
          <div className="emoji emoji-button">👩🏽</div>
          <div className="emoji emoji-button">🧑🏽</div>
          <div className="emoji emoji-button">👨🏽</div>
          <div className="emoji emoji-button">👩🏽‍🦱</div>
          <div className="emoji emoji-button">🧑🏽‍🦱</div>
          <div className="emoji emoji-button">👨🏽‍🦱</div>
          <div className="emoji emoji-button">👩🏽‍🦰</div>
          <div className="emoji emoji-button">🧑🏽‍🦰</div>
          <div className="emoji emoji-button">👨🏽‍🦰</div>
          <div className="emoji emoji-button">👱🏽‍♀️</div>
          <div className="emoji emoji-button">👱🏽</div>
          <div className="emoji emoji-button">👱🏽‍♂️</div>
          <div className="emoji emoji-button">👩🏽‍🦳</div>
          <div className="emoji emoji-button">🧑🏽‍🦳</div>
          <div className="emoji emoji-button">👨🏽‍🦳</div>
          <div className="emoji emoji-button">👩🏽‍🦲</div>
          <div className="emoji emoji-button">🧑🏽‍🦲</div>
          <div className="emoji emoji-button">👨🏽‍🦲</div>
          <div className="emoji emoji-button">🧔🏽‍♀️</div>
          <div className="emoji emoji-button">🧔🏽</div>
          <div className="emoji emoji-button">🧔🏽‍♂️</div>
          <div className="emoji emoji-button">👵🏽</div>
          <div className="emoji emoji-button">🧓🏽</div>
          <div className="emoji emoji-button">👴🏽</div>
          <div className="emoji emoji-button">👲🏽</div>
          <div className="emoji emoji-button">👳🏽‍♀️</div>
          <div className="emoji emoji-button">👳🏽</div>
          <div className="emoji emoji-button">👳🏽‍♂️</div>
          <div className="emoji emoji-button">🧕🏽</div>
          <div className="emoji emoji-button">👮🏽‍♀️</div>
          <div className="emoji emoji-button">👮🏽</div>
          <div className="emoji emoji-button">👮🏽‍♂️</div>
          <div className="emoji emoji-button">👷🏽‍♀️</div>
          <div className="emoji emoji-button">👷🏽</div>
          <div className="emoji emoji-button">👷🏽‍♂️</div>
          <div className="emoji emoji-button">💂🏽‍♀️</div>
          <div className="emoji emoji-button">💂🏽</div>
          <div className="emoji emoji-button">💂🏽‍♂️</div>
          <div className="emoji emoji-button">🕵🏽‍♀️</div>
          <div className="emoji emoji-button">🕵🏽</div>
          <div className="emoji emoji-button">🕵🏽‍♂️</div>
          <div className="emoji emoji-button">👩🏽‍⚕️</div>
          <div className="emoji emoji-button">🧑🏽‍⚕️</div>
          <div className="emoji emoji-button">👨🏽‍⚕️</div>
          <div className="emoji emoji-button">👩🏽‍🌾</div>
          <div className="emoji emoji-button">🧑🏽‍🌾</div>
          <div className="emoji emoji-button">👨🏽‍🌾</div>
          <div className="emoji emoji-button">👩🏽‍🍳</div>
          <div className="emoji emoji-button">🧑🏽‍🍳</div>
          <div className="emoji emoji-button">👨🏽‍🍳</div>
          <div className="emoji emoji-button">👩🏽‍🎓</div>
          <div className="emoji emoji-button">🧑🏽‍🎓</div>
          <div className="emoji emoji-button">👨🏽‍🎓</div>
          <div className="emoji emoji-button">👩🏽‍🎤</div>
          <div className="emoji emoji-button">🧑🏽‍🎤</div>
          <div className="emoji emoji-button">👨🏽‍🎤</div>
          <div className="emoji emoji-button">👩🏽‍🏫</div>
          <div className="emoji emoji-button">🧑🏽‍🏫</div>
          <div className="emoji emoji-button">👨🏽‍🏫</div>
          <div className="emoji emoji-button">👩🏽‍🏭</div>
          <div className="emoji emoji-button">🧑🏽‍🏭</div>
          <div className="emoji emoji-button">👨🏽‍🏭</div>
          <div className="emoji emoji-button">👩🏽‍💻</div>
          <div className="emoji emoji-button">🧑🏽‍💻</div>
          <div className="emoji emoji-button">👨🏽‍💻</div>
          <div className="emoji emoji-button">👩🏽‍💼</div>
          <div className="emoji emoji-button">🧑🏽‍💼</div>
          <div className="emoji emoji-button">👨🏽‍💼</div>
          <div className="emoji emoji-button">👩🏽‍🔧</div>
          <div className="emoji emoji-button">🧑🏽‍🔧</div>
          <div className="emoji emoji-button">👨🏽‍🔧</div>
          <div className="emoji emoji-button">👩🏽‍🔬</div>
          <div className="emoji emoji-button">🧑🏽‍🔬</div>
          <div className="emoji emoji-button">👨🏽‍🔬</div>
          <div className="emoji emoji-button">👩🏽‍🎨</div>
          <div className="emoji emoji-button">🧑🏽‍🎨</div>
          <div className="emoji emoji-button">👨🏽‍🎨</div>
          <div className="emoji emoji-button">👩🏽‍🚒</div>
          <div className="emoji emoji-button">🧑🏽‍🚒</div>
          <div className="emoji emoji-button">👨🏽‍🚒</div>
          <div className="emoji emoji-button">👩🏽‍✈️</div>
          <div className="emoji emoji-button">🧑🏽‍✈️</div>
          <div className="emoji emoji-button">👨🏽‍✈️</div>
          <div className="emoji emoji-button">👩🏽‍🚀</div>
          <div className="emoji emoji-button">🧑🏽‍🚀</div>
          <div className="emoji emoji-button">👨🏽‍🚀</div>
          <div className="emoji emoji-button">👩🏽‍⚖️</div>
          <div className="emoji emoji-button">🧑🏽‍⚖️</div>
          <div className="emoji emoji-button">👨🏽‍⚖️</div>
          <div className="emoji emoji-button">👰🏽‍♀️</div>
          <div className="emoji emoji-button">👰🏽</div>
          <div className="emoji emoji-button">👰🏽‍♂️</div>
          <div className="emoji emoji-button">🤵🏽‍♀️</div>
          <div className="emoji emoji-button">🤵🏽</div>
          <div className="emoji emoji-button">🤵🏽‍♂️</div>
          <div className="emoji emoji-button">👸🏽</div>
          <div className="emoji emoji-button">🫅🏽</div>
          <div className="emoji emoji-button">🤴🏽</div>
          <div className="emoji emoji-button">🥷🏽</div>
          <div className="emoji emoji-button">🦸🏽‍♀️</div>
          <div className="emoji emoji-button">🦸🏽</div>
          <div className="emoji emoji-button">🦸🏽‍♂️</div>
          <div className="emoji emoji-button">🦹🏽‍♀️</div>
          <div className="emoji emoji-button">🦹🏽</div>
          <div className="emoji emoji-button">🦹🏽‍♂️</div>
          <div className="emoji emoji-button">🤶🏽</div>
          <div className="emoji emoji-button">🧑🏽‍🎄</div>
          <div className="emoji emoji-button">🎅🏽</div>
          <div className="emoji emoji-button">🧙🏽‍♀️</div>
          <div className="emoji emoji-button">🧙🏽</div>
          <div className="emoji emoji-button">🧙🏽‍♂️</div>
          <div className="emoji emoji-button">🧝🏽‍♀️</div>
          <div className="emoji emoji-button">🧝🏽</div>
          <div className="emoji emoji-button">🧝🏽‍♂️</div>
          <div className="emoji emoji-button">🧛🏽‍♀️</div>
          <div className="emoji emoji-button">🧛🏽</div>
          <div className="emoji emoji-button">🧛🏽‍♂️</div>
          <div className="emoji emoji-button">🧜🏽‍♀️</div>
          <div className="emoji emoji-button">🧜🏽</div>
          <div className="emoji emoji-button">🧜🏽‍♂️</div>
          <div className="emoji emoji-button">🧚🏽‍♀️</div>
          <div className="emoji emoji-button">🧚🏽</div>
          <div className="emoji emoji-button">🧚🏽‍♂️</div>
          <div className="emoji emoji-button">👼🏽</div>
          <div className="emoji emoji-button">🤰🏽</div>
          <div className="emoji emoji-button">🫄🏽</div>
          <div className="emoji emoji-button">🫃🏽</div>
          <div className="emoji emoji-button">🤱🏽</div>
          <div className="emoji emoji-button">👩🏽‍🍼</div>
          <div className="emoji emoji-button">🧑🏽‍🍼</div>
          <div className="emoji emoji-button">👨🏽‍🍼</div>
          <div className="emoji emoji-button">🙇🏽‍♀️</div>
          <div className="emoji emoji-button">🙇🏽</div>
          <div className="emoji emoji-button">🙇🏽‍♂️</div>
          <div className="emoji emoji-button">💁🏽‍♀️</div>
          <div className="emoji emoji-button">💁🏽</div>
          <div className="emoji emoji-button">💁🏽‍♂️</div>
          <div className="emoji emoji-button">🙅🏽‍♀️</div>
          <div className="emoji emoji-button">🙅🏽</div>
          <div className="emoji emoji-button">🙅🏽‍♂️</div>
          <div className="emoji emoji-button">🙆🏽‍♀️</div>
          <div className="emoji emoji-button">🙆🏽</div>
          <div className="emoji emoji-button">🙆🏽‍♂️</div>
          <div className="emoji emoji-button">🙋🏽‍♀️</div>
          <div className="emoji emoji-button">🙋🏽</div>
          <div className="emoji emoji-button">🙋🏽‍♂️</div>
          <div className="emoji emoji-button">🧏🏽‍♀️</div>
          <div className="emoji emoji-button">🧏🏽</div>
          <div className="emoji emoji-button">🧏🏽‍♂️</div>
          <div className="emoji emoji-button">🤦🏽‍♀️</div>
          <div className="emoji emoji-button">🤦🏽</div>
          <div className="emoji emoji-button">🤦🏽‍♂️</div>
          <div className="emoji emoji-button">🤷🏽‍♀️</div>
          <div className="emoji emoji-button">🤷🏽</div>
          <div className="emoji emoji-button">🤷🏽‍♂️</div>
          <div className="emoji emoji-button">🙎🏽‍♀️</div>
          <div className="emoji emoji-button">🙎🏽</div>
          <div className="emoji emoji-button">🙎🏽‍♂️</div>
          <div className="emoji emoji-button">🙍🏽‍♀️</div>
          <div className="emoji emoji-button">🙍🏽</div>
          <div className="emoji emoji-button">🙍🏽‍♂️</div>
          <div className="emoji emoji-button">💇🏽‍♀️</div>
          <div className="emoji emoji-button">💇🏽</div>
          <div className="emoji emoji-button">💇🏽‍♂️</div>
          <div className="emoji emoji-button">💆🏽‍♀️</div>
          <div className="emoji emoji-button">💆🏽</div>
          <div className="emoji emoji-button">💆🏽‍♂️</div>
          <div className="emoji emoji-button">🧖🏽‍♀️</div>
          <div className="emoji emoji-button">🧖🏽</div>
          <div className="emoji emoji-button">🧖🏽‍♂️</div>
          <div className="emoji emoji-button">🧑🏽‍🩰</div>
          <div className="emoji emoji-button">💃🏽</div>
          <div className="emoji emoji-button">🕺🏽</div>
          <div className="emoji emoji-button">🕴🏽</div>
          <div className="emoji emoji-button">👩🏽‍🦽</div>
          <div className="emoji emoji-button">👩🏽‍🦽‍➡️</div>
          <div className="emoji emoji-button">🧑🏽‍🦽</div>
          <div className="emoji emoji-button">🧑🏽‍🦽‍➡️</div>
          <div className="emoji emoji-button">👨🏽‍🦽</div>
          <div className="emoji emoji-button">👨🏽‍🦽‍➡️</div>
          <div className="emoji emoji-button">👩🏽‍🦼</div>
          <div className="emoji emoji-button">👩🏽‍🦼‍➡️</div>
          <div className="emoji emoji-button">🧑🏽‍🦼</div>
          <div className="emoji emoji-button">🧑🏽‍🦼‍➡️</div>
          <div className="emoji emoji-button">👨🏽‍🦼</div>
          <div className="emoji emoji-button">👨🏽‍🦼‍➡️</div>
          <div className="emoji emoji-button">🚶🏽‍♀️</div>
          <div className="emoji emoji-button">🚶🏽‍♀️‍➡️</div>
          <div className="emoji emoji-button">🚶🏽</div>
          <div className="emoji emoji-button">🚶🏽‍➡️</div>
          <div className="emoji emoji-button">🚶🏽‍♂️</div>
          <div className="emoji emoji-button">🚶🏽‍♂️‍➡️</div>
          <div className="emoji emoji-button">👩🏽‍🦯</div>
          <div className="emoji emoji-button">👩🏽‍🦯‍➡️</div>
          <div className="emoji emoji-button">🧑🏽‍🦯</div>
          <div className="emoji emoji-button">🧑🏽‍🦯‍➡️</div>
          <div className="emoji emoji-button">👨🏽‍🦯</div>
          <div className="emoji emoji-button">👨🏽‍🦯‍➡️</div>
          <div className="emoji emoji-button">🧎🏽‍♀️</div>
          <div className="emoji emoji-button">🧎🏽‍♀️‍➡️</div>
          <div className="emoji emoji-button">🧎🏽</div>
          <div className="emoji emoji-button">🧎🏽‍➡️</div>
          <div className="emoji emoji-button">🧎🏽‍♂️</div>
          <div className="emoji emoji-button">🧎🏽‍♂️‍➡️</div>
          <div className="emoji emoji-button">🏃🏽‍♀️</div>
          <div className="emoji emoji-button">🏃🏽‍♀️‍➡️</div>
          <div className="emoji emoji-button">🏃🏽</div>
          <div className="emoji emoji-button">🏃🏽‍➡️</div>
          <div className="emoji emoji-button">🏃🏽‍♂️</div>
          <div className="emoji emoji-button">🏃🏽‍♂️‍➡️</div>
          <div className="emoji emoji-button">🧍🏽‍♀️</div>
          <div className="emoji emoji-button">🧍🏽</div>
          <div className="emoji emoji-button">🧍🏽‍♂️</div>
          <div className="emoji emoji-button">👭🏽</div>
          <div className="emoji emoji-button">🧑🏽‍🤝‍🧑🏽</div>
          <div className="emoji emoji-button">👬🏽</div>
          <div className="emoji emoji-button">👫🏽</div>
          <div className="emoji emoji-button">🧗🏽‍♀️</div>
          <div className="emoji emoji-button">🧗🏽</div>
          <div className="emoji emoji-button">🧗🏽‍♂️</div>
          <div className="emoji emoji-button">🏇🏽</div>
          <div className="emoji emoji-button">🏂🏽</div>
          <div className="emoji emoji-button">🏌🏽‍♀️</div>
          <div className="emoji emoji-button">🏌🏽</div>
          <div className="emoji emoji-button">🏌🏽‍♂️</div>
          <div className="emoji emoji-button">🏄🏽‍♀️</div>
          <div className="emoji emoji-button">🏄🏽</div>
          <div className="emoji emoji-button">🏄🏽‍♂️</div>
          <div className="emoji emoji-button">🚣🏽‍♀️</div>
          <div className="emoji emoji-button">🚣🏽</div>
          <div className="emoji emoji-button">🚣🏽‍♂️</div>
          <div className="emoji emoji-button">🏊🏽‍♀️</div>
          <div className="emoji emoji-button">🏊🏽</div>
          <div className="emoji emoji-button">🏊🏽‍♂️</div>
          <div className="emoji emoji-button">⛹🏽‍♀️</div>
          <div className="emoji emoji-button">⛹🏽</div>
          <div className="emoji emoji-button">⛹🏽‍♂️</div>
          <div className="emoji emoji-button">🏋🏽‍♀️</div>
          <div className="emoji emoji-button">🏋🏽</div>
          <div className="emoji emoji-button">🏋🏽‍♂️</div>
          <div className="emoji emoji-button">🚴🏽‍♀️</div>
          <div className="emoji emoji-button">🚴🏽</div>
          <div className="emoji emoji-button">🚴🏽‍♂️</div>
          <div className="emoji emoji-button">🚵🏽‍♀️</div>
          <div className="emoji emoji-button">🚵🏽</div>
          <div className="emoji emoji-button">🚵🏽‍♂️</div>
          <div className="emoji emoji-button">🤸🏽‍♀️</div>
          <div className="emoji emoji-button">🤸🏽</div>
          <div className="emoji emoji-button">🤸🏽‍♂️</div>
          <div className="emoji emoji-button">🤽🏽‍♀️</div>
          <div className="emoji emoji-button">🤽🏽</div>
          <div className="emoji emoji-button">🤽🏽‍♂️</div>
          <div className="emoji emoji-button">🤾🏽‍♀️</div>
          <div className="emoji emoji-button">🤾🏽</div>
          <div className="emoji emoji-button">🤾🏽‍♂️</div>
          <div className="emoji emoji-button">🤹🏽‍♀️</div>
          <div className="emoji emoji-button">🤹🏽</div>
          <div className="emoji emoji-button">🤹🏽‍♂️</div>
          <div className="emoji emoji-button">🧘🏽‍♀️</div>
          <div className="emoji emoji-button">🧘🏽</div>
          <div className="emoji emoji-button">🧘🏽‍♂️</div>
          <div className="emoji emoji-button">🛀🏽</div>
          <div className="emoji emoji-button">🛌🏽</div>
        </div>
      </section>
      <section className="flex flex-col w-auto gap-4 mx-auto md:mx-0">
        <h2>
          <a
            title="List of medium dark skin tone emojis"
            href="https://emojipedia.org/medium-dark-skin-tone"
            target="_blank"
            >Dark Brown Emojis</a
          >
        </h2>
        <div className="flex flex-wrap">
          <div className="emoji emoji-button">👋🏾</div>
          <div className="emoji emoji-button">🤚🏾</div>
          <div className="emoji emoji-button">🖐🏾</div>
          <div className="emoji emoji-button">✋🏾</div>
          <div className="emoji emoji-button">🖖🏾</div>
          <div className="emoji emoji-button">👌🏾</div>
          <div className="emoji emoji-button">🤌🏾</div>
          <div className="emoji emoji-button">🤏🏾</div>
          <div className="emoji emoji-button">✌🏾</div>
          <div className="emoji emoji-button">🤞🏾</div>
          <div className="emoji emoji-button">🫰🏾</div>
          <div className="emoji emoji-button">🤟🏾</div>
          <div className="emoji emoji-button">🤘🏾</div>
          <div className="emoji emoji-button">🤙🏾</div>
          <div className="emoji emoji-button">🫵🏾</div>
          <div className="emoji emoji-button">🫱🏾</div>
          <div className="emoji emoji-button">🫲🏾</div>
          <div className="emoji emoji-button">🫸🏾</div>
          <div className="emoji emoji-button">🫷🏾</div>
          <div className="emoji emoji-button">🫳🏾</div>
          <div className="emoji emoji-button">🫴🏾</div>
          <div className="emoji emoji-button">👈🏾</div>
          <div className="emoji emoji-button">👉🏾</div>
          <div className="emoji emoji-button">👆🏾</div>
          <div className="emoji emoji-button">🖕🏾</div>
          <div className="emoji emoji-button">👇🏾</div>
          <div className="emoji emoji-button">☝🏾</div>
          <div className="emoji emoji-button">👍🏾</div>
          <div className="emoji emoji-button">👎🏾</div>
          <div className="emoji emoji-button">✊🏾</div>
          <div className="emoji emoji-button">👊🏾</div>
          <div className="emoji emoji-button">🤛🏾</div>
          <div className="emoji emoji-button">🤜🏾</div>
          <div className="emoji emoji-button">👏🏾</div>
          <div className="emoji emoji-button">🫶🏾</div>
          <div className="emoji emoji-button">🙌🏾</div>
          <div className="emoji emoji-button">👐🏾</div>
          <div className="emoji emoji-button">🤲🏾</div>
          <div className="emoji emoji-button">🙏🏾</div>
          <div className="emoji emoji-button">✍🏾</div>
          <div className="emoji emoji-button">💅🏾</div>
          <div className="emoji emoji-button">🤳🏾</div>
          <div className="emoji emoji-button">💪🏾</div>
          <div className="emoji emoji-button">🦵🏾</div>
          <div className="emoji emoji-button">🦶🏾</div>
          <div className="emoji emoji-button">👂🏾</div>
          <div className="emoji emoji-button">🦻🏾</div>
          <div className="emoji emoji-button">👃🏾</div>
          <div className="emoji emoji-button">👶🏾</div>
          <div className="emoji emoji-button">👧🏾</div>
          <div className="emoji emoji-button">🧒🏾</div>
          <div className="emoji emoji-button">👦🏾</div>
          <div className="emoji emoji-button">👩🏾</div>
          <div className="emoji emoji-button">🧑🏾</div>
          <div className="emoji emoji-button">👨🏾</div>
          <div className="emoji emoji-button">👩🏾‍🦱</div>
          <div className="emoji emoji-button">🧑🏾‍🦱</div>
          <div className="emoji emoji-button">👨🏾‍🦱</div>
          <div className="emoji emoji-button">👩🏾‍🦰</div>
          <div className="emoji emoji-button">🧑🏾‍🦰</div>
          <div className="emoji emoji-button">👨🏾‍🦰</div>
          <div className="emoji emoji-button">👱🏾‍♀️</div>
          <div className="emoji emoji-button">👱🏾</div>
          <div className="emoji emoji-button">👱🏾‍♂️</div>
          <div className="emoji emoji-button">👩🏾‍🦳</div>
          <div className="emoji emoji-button">🧑🏾‍🦳</div>
          <div className="emoji emoji-button">👨🏾‍🦳</div>
          <div className="emoji emoji-button">👩🏾‍🦲</div>
          <div className="emoji emoji-button">🧑🏾‍🦲</div>
          <div className="emoji emoji-button">👨🏾‍🦲</div>
          <div className="emoji emoji-button">🧔🏾‍♀️</div>
          <div className="emoji emoji-button">🧔🏾</div>
          <div className="emoji emoji-button">🧔🏾‍♂️</div>
          <div className="emoji emoji-button">👵🏾</div>
          <div className="emoji emoji-button">🧓🏾</div>
          <div className="emoji emoji-button">👴🏾</div>
          <div className="emoji emoji-button">👲🏾</div>
          <div className="emoji emoji-button">👳🏾‍♀️</div>
          <div className="emoji emoji-button">👳🏾</div>
          <div className="emoji emoji-button">👳🏾‍♂️</div>
          <div className="emoji emoji-button">🧕🏾</div>
          <div className="emoji emoji-button">👮🏾‍♀️</div>
          <div className="emoji emoji-button">👮🏾</div>
          <div className="emoji emoji-button">👮🏾‍♂️</div>
          <div className="emoji emoji-button">👷🏾‍♀️</div>
          <div className="emoji emoji-button">👷🏾</div>
          <div className="emoji emoji-button">👷🏾‍♂️</div>
          <div className="emoji emoji-button">💂🏾‍♀️</div>
          <div className="emoji emoji-button">💂🏾</div>
          <div className="emoji emoji-button">💂🏾‍♂️</div>
          <div className="emoji emoji-button">🕵🏾‍♀️</div>
          <div className="emoji emoji-button">🕵🏾</div>
          <div className="emoji emoji-button">🕵🏾‍♂️</div>
          <div className="emoji emoji-button">👩🏾‍⚕️</div>
          <div className="emoji emoji-button">🧑🏾‍⚕️</div>
          <div className="emoji emoji-button">👨🏾‍⚕️</div>
          <div className="emoji emoji-button">👩🏾‍🌾</div>
          <div className="emoji emoji-button">🧑🏾‍🌾</div>
          <div className="emoji emoji-button">👨🏾‍🌾</div>
          <div className="emoji emoji-button">👩🏾‍🍳</div>
          <div className="emoji emoji-button">🧑🏾‍🍳</div>
          <div className="emoji emoji-button">👨🏾‍🍳</div>
          <div className="emoji emoji-button">👩🏾‍🎓</div>
          <div className="emoji emoji-button">🧑🏾‍🎓</div>
          <div className="emoji emoji-button">👨🏾‍🎓</div>
          <div className="emoji emoji-button">👩🏾‍🎤</div>
          <div className="emoji emoji-button">🧑🏾‍🎤</div>
          <div className="emoji emoji-button">👨🏾‍🎤</div>
          <div className="emoji emoji-button">👩🏾‍🏫</div>
          <div className="emoji emoji-button">🧑🏾‍🏫</div>
          <div className="emoji emoji-button">👨🏾‍🏫</div>
          <div className="emoji emoji-button">👩🏾‍🏭</div>
          <div className="emoji emoji-button">🧑🏾‍🏭</div>
          <div className="emoji emoji-button">👨🏾‍🏭</div>
          <div className="emoji emoji-button">👩🏾‍💻</div>
          <div className="emoji emoji-button">🧑🏾‍💻</div>
          <div className="emoji emoji-button">👨🏾‍💻</div>
          <div className="emoji emoji-button">👩🏾‍💼</div>
          <div className="emoji emoji-button">🧑🏾‍💼</div>
          <div className="emoji emoji-button">👨🏾‍💼</div>
          <div className="emoji emoji-button">👩🏾‍🔧</div>
          <div className="emoji emoji-button">🧑🏾‍🔧</div>
          <div className="emoji emoji-button">👨🏾‍🔧</div>
          <div className="emoji emoji-button">👩🏾‍🔬</div>
          <div className="emoji emoji-button">🧑🏾‍🔬</div>
          <div className="emoji emoji-button">👨🏾‍🔬</div>
          <div className="emoji emoji-button">👩🏾‍🎨</div>
          <div className="emoji emoji-button">🧑🏾‍🎨</div>
          <div className="emoji emoji-button">👨🏾‍🎨</div>
          <div className="emoji emoji-button">👩🏾‍🚒</div>
          <div className="emoji emoji-button">🧑🏾‍🚒</div>
          <div className="emoji emoji-button">👨🏾‍🚒</div>
          <div className="emoji emoji-button">👩🏾‍✈️</div>
          <div className="emoji emoji-button">🧑🏾‍✈️</div>
          <div className="emoji emoji-button">👨🏾‍✈️</div>
          <div className="emoji emoji-button">👩🏾‍🚀</div>
          <div className="emoji emoji-button">🧑🏾‍🚀</div>
          <div className="emoji emoji-button">👨🏾‍🚀</div>
          <div className="emoji emoji-button">👩🏾‍⚖️</div>
          <div className="emoji emoji-button">🧑🏾‍⚖️</div>
          <div className="emoji emoji-button">👨🏾‍⚖️</div>
          <div className="emoji emoji-button">👰🏾‍♀️</div>
          <div className="emoji emoji-button">👰🏾</div>
          <div className="emoji emoji-button">👰🏾‍♂️</div>
          <div className="emoji emoji-button">🤵🏾‍♀️</div>
          <div className="emoji emoji-button">🤵🏾</div>
          <div className="emoji emoji-button">🤵🏾‍♂️</div>
          <div className="emoji emoji-button">👸🏾</div>
          <div className="emoji emoji-button">🫅🏾</div>
          <div className="emoji emoji-button">🤴🏾</div>
          <div className="emoji emoji-button">🥷🏾</div>
          <div className="emoji emoji-button">🦸🏾‍♀️</div>
          <div className="emoji emoji-button">🦸🏾</div>
          <div className="emoji emoji-button">🦸🏾‍♂️</div>
          <div className="emoji emoji-button">🦹🏾‍♀️</div>
          <div className="emoji emoji-button">🦹🏾</div>
          <div className="emoji emoji-button">🦹🏾‍♂️</div>
          <div className="emoji emoji-button">🤶🏾</div>
          <div className="emoji emoji-button">🧑🏾‍🎄</div>
          <div className="emoji emoji-button">🎅🏾</div>
          <div className="emoji emoji-button">🧙🏾‍♀️</div>
          <div className="emoji emoji-button">🧙🏾</div>
          <div className="emoji emoji-button">🧙🏾‍♂️</div>
          <div className="emoji emoji-button">🧝🏾‍♀️</div>
          <div className="emoji emoji-button">🧝🏾</div>
          <div className="emoji emoji-button">🧝🏾‍♂️</div>
          <div className="emoji emoji-button">🧛🏾‍♀️</div>
          <div className="emoji emoji-button">🧛🏾</div>
          <div className="emoji emoji-button">🧛🏾‍♂️</div>
          <div className="emoji emoji-button">🧜🏾‍♀️</div>
          <div className="emoji emoji-button">🧜🏾</div>
          <div className="emoji emoji-button">🧜🏾‍♂️</div>
          <div className="emoji emoji-button">🧚🏾‍♀️</div>
          <div className="emoji emoji-button">🧚🏾</div>
          <div className="emoji emoji-button">🧚🏾‍♂️</div>
          <div className="emoji emoji-button">👼🏾</div>
          <div className="emoji emoji-button">🤰🏾</div>
          <div className="emoji emoji-button">🫄🏾</div>
          <div className="emoji emoji-button">🫃🏾</div>
          <div className="emoji emoji-button">🤱🏾</div>
          <div className="emoji emoji-button">👩🏾‍🍼</div>
          <div className="emoji emoji-button">🧑🏾‍🍼</div>
          <div className="emoji emoji-button">👨🏾‍🍼</div>
          <div className="emoji emoji-button">🙇🏾‍♀️</div>
          <div className="emoji emoji-button">🙇🏾</div>
          <div className="emoji emoji-button">🙇🏾‍♂️</div>
          <div className="emoji emoji-button">💁🏾‍♀️</div>
          <div className="emoji emoji-button">💁🏾</div>
          <div className="emoji emoji-button">💁🏾‍♂️</div>
          <div className="emoji emoji-button">🙅🏾‍♀️</div>
          <div className="emoji emoji-button">🙅🏾</div>
          <div className="emoji emoji-button">🙅🏾‍♂️</div>
          <div className="emoji emoji-button">🙆🏾‍♀️</div>
          <div className="emoji emoji-button">🙆🏾</div>
          <div className="emoji emoji-button">🙆🏾‍♂️</div>
          <div className="emoji emoji-button">🙋🏾‍♀️</div>
          <div className="emoji emoji-button">🙋🏾</div>
          <div className="emoji emoji-button">🙋🏾‍♂️</div>
          <div className="emoji emoji-button">🧏🏾‍♀️</div>
          <div className="emoji emoji-button">🧏🏾</div>
          <div className="emoji emoji-button">🧏🏾‍♂️</div>
          <div className="emoji emoji-button">🤦🏾‍♀️</div>
          <div className="emoji emoji-button">🤦🏾</div>
          <div className="emoji emoji-button">🤦🏾‍♂️</div>
          <div className="emoji emoji-button">🤷🏾‍♀️</div>
          <div className="emoji emoji-button">🤷🏾</div>
          <div className="emoji emoji-button">🤷🏾‍♂️</div>
          <div className="emoji emoji-button">🙎🏾‍♀️</div>
          <div className="emoji emoji-button">🙎🏾</div>
          <div className="emoji emoji-button">🙎🏾‍♂️</div>
          <div className="emoji emoji-button">🙍🏾‍♀️</div>
          <div className="emoji emoji-button">🙍🏾</div>
          <div className="emoji emoji-button">🙍🏾‍♂️</div>
          <div className="emoji emoji-button">💇🏾‍♀️</div>
          <div className="emoji emoji-button">💇🏾</div>
          <div className="emoji emoji-button">💇🏾‍♂️</div>
          <div className="emoji emoji-button">💆🏾‍♀️</div>
          <div className="emoji emoji-button">💆🏾</div>
          <div className="emoji emoji-button">💆🏾‍♂️</div>
          <div className="emoji emoji-button">🧖🏾‍♀️</div>
          <div className="emoji emoji-button">🧖🏾</div>
          <div className="emoji emoji-button">🧖🏾‍♂️</div>
          <div className="emoji emoji-button">🧑🏾‍🩰</div>
          <div className="emoji emoji-button">💃🏾</div>
          <div className="emoji emoji-button">🕺🏾</div>
          <div className="emoji emoji-button">🕴🏿</div>
          <div className="emoji emoji-button">👩🏾‍🦽</div>
          <div className="emoji emoji-button">👩🏾‍🦽‍➡️</div>
          <div className="emoji emoji-button">🧑🏾‍🦽</div>
          <div className="emoji emoji-button">🧑🏾‍🦽‍➡️</div>
          <div className="emoji emoji-button">👨🏾‍🦽</div>
          <div className="emoji emoji-button">👨🏾‍🦽‍➡️</div>
          <div className="emoji emoji-button">👩🏾‍🦼</div>
          <div className="emoji emoji-button">👩🏾‍🦼‍➡️</div>
          <div className="emoji emoji-button">🧑🏾‍🦼</div>
          <div className="emoji emoji-button">🧑🏾‍🦼‍➡️</div>
          <div className="emoji emoji-button">👨🏾‍🦼</div>
          <div className="emoji emoji-button">👨🏾‍🦼‍➡️</div>
          <div className="emoji emoji-button">🚶🏾‍♀️</div>
          <div className="emoji emoji-button">🚶🏾‍♀️‍➡️</div>
          <div className="emoji emoji-button">🚶🏾</div>
          <div className="emoji emoji-button">🚶🏾‍➡️</div>
          <div className="emoji emoji-button">🚶🏾‍♂️</div>
          <div className="emoji emoji-button">🚶🏾‍♂️‍➡️</div>
          <div className="emoji emoji-button">👩🏾‍🦯</div>
          <div className="emoji emoji-button">👩🏾‍🦯‍➡️</div>
          <div className="emoji emoji-button">🧑🏾‍🦯</div>
          <div className="emoji emoji-button">🧑🏾‍🦯‍➡️</div>
          <div className="emoji emoji-button">👨🏾‍🦯</div>
          <div className="emoji emoji-button">👨🏾‍🦯‍➡️</div>
          <div className="emoji emoji-button">🧎🏾‍♀️</div>
          <div className="emoji emoji-button">🧎🏾‍♀️‍➡️</div>
          <div className="emoji emoji-button">🧎🏾</div>
          <div className="emoji emoji-button">🧎🏾‍➡️</div>
          <div className="emoji emoji-button">🧎🏾‍♂️</div>
          <div className="emoji emoji-button">🧎🏾‍♂️‍➡️</div>
          <div className="emoji emoji-button">🏃🏾‍♀️</div>
          <div className="emoji emoji-button">🏃🏾‍♀️‍➡️</div>
          <div className="emoji emoji-button">🏃🏾</div>
          <div className="emoji emoji-button">🏃🏾‍➡️</div>
          <div className="emoji emoji-button">🏃🏾‍♂️</div>
          <div className="emoji emoji-button">🏃🏾‍♂️‍➡️</div>
          <div className="emoji emoji-button">🧍🏾‍♀️</div>
          <div className="emoji emoji-button">🧍🏾</div>
          <div className="emoji emoji-button">🧍🏾‍♂️</div>
          <div className="emoji emoji-button">👭🏾</div>
          <div className="emoji emoji-button">🧑🏾‍🤝‍🧑🏾</div>
          <div className="emoji emoji-button">👬🏾</div>
          <div className="emoji emoji-button">👫🏾</div>
          <div className="emoji emoji-button">🧗🏾‍♀️</div>
          <div className="emoji emoji-button">🧗🏾</div>
          <div className="emoji emoji-button">🧗🏾‍♂️</div>
          <div className="emoji emoji-button">🏇🏾</div>
          <div className="emoji emoji-button">🏂🏾</div>
          <div className="emoji emoji-button">🏌🏾‍♀️</div>
          <div className="emoji emoji-button">🏌🏾</div>
          <div className="emoji emoji-button">🏌🏾‍♂️</div>
          <div className="emoji emoji-button">🏄🏾‍♀️</div>
          <div className="emoji emoji-button">🏄🏾</div>
          <div className="emoji emoji-button">🏄🏾‍♂️</div>
          <div className="emoji emoji-button">🚣🏾‍♀️</div>
          <div className="emoji emoji-button">🚣🏾</div>
          <div className="emoji emoji-button">🚣🏾‍♂️</div>
          <div className="emoji emoji-button">🏊🏾‍♀️</div>
          <div className="emoji emoji-button">🏊🏾</div>
          <div className="emoji emoji-button">🏊🏾‍♂️</div>
          <div className="emoji emoji-button">⛹🏾‍♀️</div>
          <div className="emoji emoji-button">⛹🏾</div>
          <div className="emoji emoji-button">⛹🏾‍♂️</div>
          <div className="emoji emoji-button">🏋🏾‍♀️</div>
          <div className="emoji emoji-button">🏋🏾</div>
          <div className="emoji emoji-button">🏋🏾‍♂️</div>
          <div className="emoji emoji-button">🚴🏾‍♀️</div>
          <div className="emoji emoji-button">🚴🏾</div>
          <div className="emoji emoji-button">🚴🏾‍♂️</div>
          <div className="emoji emoji-button">🚵🏾‍♀️</div>
          <div className="emoji emoji-button">🚵🏾</div>
          <div className="emoji emoji-button">🚵🏾‍♂️</div>
          <div className="emoji emoji-button">🤸🏾‍♀️</div>
          <div className="emoji emoji-button">🤸🏾</div>
          <div className="emoji emoji-button">🤸🏾‍♂️</div>
          <div className="emoji emoji-button">🤽🏾‍♀️</div>
          <div className="emoji emoji-button">🤽🏾</div>
          <div className="emoji emoji-button">🤽🏾‍♂️</div>
          <div className="emoji emoji-button">🤾🏾‍♀️</div>
          <div className="emoji emoji-button">🤾🏾</div>
          <div className="emoji emoji-button">🤾🏾‍♂️</div>
          <div className="emoji emoji-button">🤹🏾‍♀️</div>
          <div className="emoji emoji-button">🤹🏾</div>
          <div className="emoji emoji-button">🤹🏾‍♂️</div>
          <div className="emoji emoji-button">🧘🏾‍♀️</div>
          <div className="emoji emoji-button">🧘🏾</div>
          <div className="emoji emoji-button">🧘🏾‍♂️</div>
          <div className="emoji emoji-button">🛀🏾</div>
          <div className="emoji emoji-button">🛌🏾</div>
        </div>
      </section>
      <div
        className="flex w-full justify-center items-center min-h-[280px]"
        data-freestar-ad="__336x280 __970x250"
        id="getemoji.com_incontent_3_v3"
        data-ad-name="getemoji.com_incontent_3_v3"
        data-google-query-id="CM-Bg9_tmpcDFa-GzgEduD4zMg"
      >
        <div
          id="google_ads_iframe_/21872898416/FS_getemoji_com_incontent_3_0__container__"
          style={{ border: "0pt", width: "468px", height: "0px" }}
        >
          <div className="__fs-ancillary" style={{ visibility: "hidden" }}>
            <div className="__fs-branding">
              <a
                href="https://ads.freestar.com/?utm_campaign=branding&amp;utm_medium=display&amp;utm_source=getemoji.com&amp;utm_content=getemoji.com_incontent_3_v3"
                target="_blank"
                rel="noreferrer"
                ><img
                  src="https://a.pub.network/core/imgs/fslogo-green.svg"
                  alt="freestar"
                  width="14"
                  height="14"
              /></a>
            </div>
            <div className="fs-branding-spacer"></div>
          </div>
        </div>
      </div>
      <section className="flex flex-col w-auto gap-4 mx-auto md:mx-0">
        <h2>
          <a
            title="List of dark skin tone emojis"
            href="https://emojipedia.org/dark-skin-tone"
            target="_blank"
            >Black Emojis</a
          >
        </h2>
        <div className="flex flex-wrap">
          <div className="emoji emoji-button">👋🏿</div>
          <div className="emoji emoji-button">🤚🏿</div>
          <div className="emoji emoji-button">🖐🏿</div>
          <div className="emoji emoji-button">✋🏿</div>
          <div className="emoji emoji-button">🖖🏿</div>
          <div className="emoji emoji-button">👌🏿</div>
          <div className="emoji emoji-button">🤌🏿</div>
          <div className="emoji emoji-button">🤏🏿</div>
          <div className="emoji emoji-button">✌🏿</div>
          <div className="emoji emoji-button">🤞🏿</div>
          <div className="emoji emoji-button">🫰🏿</div>
          <div className="emoji emoji-button">🤟🏿</div>
          <div className="emoji emoji-button">🤘🏿</div>
          <div className="emoji emoji-button">🤙🏿</div>
          <div className="emoji emoji-button">🫵🏿</div>
          <div className="emoji emoji-button">🫱🏿</div>
          <div className="emoji emoji-button">🫲🏿</div>
          <div className="emoji emoji-button">🫸🏿</div>
          <div className="emoji emoji-button">🫷🏿</div>
          <div className="emoji emoji-button">🫳🏿</div>
          <div className="emoji emoji-button">🫴🏿</div>
          <div className="emoji emoji-button">👈🏿</div>
          <div className="emoji emoji-button">👉🏿</div>
          <div className="emoji emoji-button">👆🏿</div>
          <div className="emoji emoji-button">🖕🏿</div>
          <div className="emoji emoji-button">👇🏿</div>
          <div className="emoji emoji-button">☝🏿</div>
          <div className="emoji emoji-button">👍🏿</div>
          <div className="emoji emoji-button">👎🏿</div>
          <div className="emoji emoji-button">✊🏿</div>
          <div className="emoji emoji-button">👊🏿</div>
          <div className="emoji emoji-button">🤛🏿</div>
          <div className="emoji emoji-button">🤜🏿</div>
          <div className="emoji emoji-button">👏🏿</div>
          <div className="emoji emoji-button">🫶🏿</div>
          <div className="emoji emoji-button">🙌🏿</div>
          <div className="emoji emoji-button">👐🏿</div>
          <div className="emoji emoji-button">🤲🏿</div>
          <div className="emoji emoji-button">🙏🏿</div>
          <div className="emoji emoji-button">✍🏿</div>
          <div className="emoji emoji-button">💅🏿</div>
          <div className="emoji emoji-button">🤳🏿</div>
          <div className="emoji emoji-button">💪🏿</div>
          <div className="emoji emoji-button">🦵🏿</div>
          <div className="emoji emoji-button">🦶🏿</div>
          <div className="emoji emoji-button">👂🏿</div>
          <div className="emoji emoji-button">🦻🏿</div>
          <div className="emoji emoji-button">👃🏿</div>
          <div className="emoji emoji-button">👶🏿</div>
          <div className="emoji emoji-button">👧🏿</div>
          <div className="emoji emoji-button">🧒🏿</div>
          <div className="emoji emoji-button">👦🏿</div>
          <div className="emoji emoji-button">👩🏿</div>
          <div className="emoji emoji-button">🧑🏿</div>
          <div className="emoji emoji-button">👨🏿</div>
          <div className="emoji emoji-button">👩🏿‍🦱</div>
          <div className="emoji emoji-button">🧑🏿‍🦱</div>
          <div className="emoji emoji-button">👨🏿‍🦱</div>
          <div className="emoji emoji-button">👩🏿‍🦰</div>
          <div className="emoji emoji-button">🧑🏿‍🦰</div>
          <div className="emoji emoji-button">👨🏿‍🦰</div>
          <div className="emoji emoji-button">👱🏿‍♀️</div>
          <div className="emoji emoji-button">👱🏿</div>
          <div className="emoji emoji-button">👱🏿‍♂️</div>
          <div className="emoji emoji-button">👩🏿‍🦳</div>
          <div className="emoji emoji-button">🧑🏿‍🦳</div>
          <div className="emoji emoji-button">👨🏿‍🦳</div>
          <div className="emoji emoji-button">👩🏿‍🦲</div>
          <div className="emoji emoji-button">🧑🏿‍🦲</div>
          <div className="emoji emoji-button">👨🏿‍🦲</div>
          <div className="emoji emoji-button">🧔🏿‍♀️</div>
          <div className="emoji emoji-button">🧔🏿</div>
          <div className="emoji emoji-button">🧔🏿‍♂️</div>
          <div className="emoji emoji-button">👵🏿</div>
          <div className="emoji emoji-button">🧓🏿</div>
          <div className="emoji emoji-button">👴🏿</div>
          <div className="emoji emoji-button">👲🏿</div>
          <div className="emoji emoji-button">👳🏿‍♀️</div>
          <div className="emoji emoji-button">👳🏿</div>
          <div className="emoji emoji-button">👳🏿‍♂️</div>
          <div className="emoji emoji-button">🧕🏿</div>
          <div className="emoji emoji-button">👮🏿‍♀️</div>
          <div className="emoji emoji-button">👮🏿</div>
          <div className="emoji emoji-button">👮🏿‍♂️</div>
          <div className="emoji emoji-button">👷🏿‍♀️</div>
          <div className="emoji emoji-button">👷🏿</div>
          <div className="emoji emoji-button">👷🏿‍♂️</div>
          <div className="emoji emoji-button">💂🏿‍♀️</div>
          <div className="emoji emoji-button">💂🏿</div>
          <div className="emoji emoji-button">💂🏿‍♂️</div>
          <div className="emoji emoji-button">🕵🏿‍♀️</div>
          <div className="emoji emoji-button">🕵🏿</div>
          <div className="emoji emoji-button">🕵🏿‍♂️</div>
          <div className="emoji emoji-button">👩🏿‍⚕️</div>
          <div className="emoji emoji-button">🧑🏿‍⚕️</div>
          <div className="emoji emoji-button">👨🏿‍⚕️</div>
          <div className="emoji emoji-button">👩🏿‍🌾</div>
          <div className="emoji emoji-button">🧑🏿‍🌾</div>
          <div className="emoji emoji-button">👨🏿‍🌾</div>
          <div className="emoji emoji-button">👩🏿‍🍳</div>
          <div className="emoji emoji-button">🧑🏿‍🍳</div>
          <div className="emoji emoji-button">👨🏿‍🍳</div>
          <div className="emoji emoji-button">👩🏿‍🎓</div>
          <div className="emoji emoji-button">🧑🏿‍🎓</div>
          <div className="emoji emoji-button">👨🏿‍🎓</div>
          <div className="emoji emoji-button">👩🏿‍🎤</div>
          <div className="emoji emoji-button">🧑🏿‍🎤</div>
          <div className="emoji emoji-button">👨🏿‍🎤</div>
          <div className="emoji emoji-button">👩🏿‍🏫</div>
          <div className="emoji emoji-button">🧑🏿‍🏫</div>
          <div className="emoji emoji-button">👨🏿‍🏫</div>
          <div className="emoji emoji-button">👩🏿‍🏭</div>
          <div className="emoji emoji-button">🧑🏿‍🏭</div>
          <div className="emoji emoji-button">👨🏿‍🏭</div>
          <div className="emoji emoji-button">👩🏿‍💻</div>
          <div className="emoji emoji-button">🧑🏿‍💻</div>
          <div className="emoji emoji-button">👨🏿‍💻</div>
          <div className="emoji emoji-button">👩🏿‍💼</div>
          <div className="emoji emoji-button">🧑🏿‍💼</div>
          <div className="emoji emoji-button">👨🏿‍💼</div>
          <div className="emoji emoji-button">👩🏿‍🔧</div>
          <div className="emoji emoji-button">🧑🏿‍🔧</div>
          <div className="emoji emoji-button">👨🏿‍🔧</div>
          <div className="emoji emoji-button">👩🏿‍🔬</div>
          <div className="emoji emoji-button">🧑🏿‍🔬</div>
          <div className="emoji emoji-button">👨🏿‍🔬</div>
          <div className="emoji emoji-button">👩🏿‍🎨</div>
          <div className="emoji emoji-button">🧑🏿‍🎨</div>
          <div className="emoji emoji-button">👨🏿‍🎨</div>
          <div className="emoji emoji-button">👩🏿‍🚒</div>
          <div className="emoji emoji-button">🧑🏿‍🚒</div>
          <div className="emoji emoji-button">👨🏿‍🚒</div>
          <div className="emoji emoji-button">👩🏿‍✈️</div>
          <div className="emoji emoji-button">🧑🏿‍✈️</div>
          <div className="emoji emoji-button">👨🏿‍✈️</div>
          <div className="emoji emoji-button">👩🏿‍🚀</div>
          <div className="emoji emoji-button">🧑🏿‍🚀</div>
          <div className="emoji emoji-button">👨🏿‍🚀</div>
          <div className="emoji emoji-button">👩🏿‍⚖️</div>
          <div className="emoji emoji-button">🧑🏿‍⚖️</div>
          <div className="emoji emoji-button">👨🏿‍⚖️</div>
          <div className="emoji emoji-button">👰🏿‍♀️</div>
          <div className="emoji emoji-button">👰🏿</div>
          <div className="emoji emoji-button">👰🏿‍♂️</div>
          <div className="emoji emoji-button">🤵🏿‍♀️</div>
          <div className="emoji emoji-button">🤵🏿</div>
          <div className="emoji emoji-button">🤵🏿‍♂️</div>
          <div className="emoji emoji-button">👸🏿</div>
          <div className="emoji emoji-button">🫅🏿</div>
          <div className="emoji emoji-button">🤴🏿</div>
          <div className="emoji emoji-button">🥷🏿</div>
          <div className="emoji emoji-button">🦸🏿‍♀️</div>
          <div className="emoji emoji-button">🦸🏿</div>
          <div className="emoji emoji-button">🦸🏿‍♂️</div>
          <div className="emoji emoji-button">🦹🏿‍♀️</div>
          <div className="emoji emoji-button">🦹🏿</div>
          <div className="emoji emoji-button">🦹🏿‍♂️</div>
          <div className="emoji emoji-button">🤶🏿</div>
          <div className="emoji emoji-button">🧑🏿‍🎄</div>
          <div className="emoji emoji-button">🎅🏿</div>
          <div className="emoji emoji-button">🧙🏿‍♀️</div>
          <div className="emoji emoji-button">🧙🏿</div>
          <div className="emoji emoji-button">🧙🏿‍♂️</div>
          <div className="emoji emoji-button">🧝🏿‍♀️</div>
          <div className="emoji emoji-button">🧝🏿</div>
          <div className="emoji emoji-button">🧝🏿‍♂️</div>
          <div className="emoji emoji-button">🧛🏿‍♀️</div>
          <div className="emoji emoji-button">🧛🏿</div>
          <div className="emoji emoji-button">🧛🏿‍♂️</div>
          <div className="emoji emoji-button">🧜🏿‍♀️</div>
          <div className="emoji emoji-button">🧜🏿</div>
          <div className="emoji emoji-button">🧜🏿‍♂️</div>
          <div className="emoji emoji-button">🧚🏿‍♀️</div>
          <div className="emoji emoji-button">🧚🏿</div>
          <div className="emoji emoji-button">🧚🏿‍♂️</div>
          <div className="emoji emoji-button">👼🏿</div>
          <div className="emoji emoji-button">🤰🏿</div>
          <div className="emoji emoji-button">🫄🏿</div>
          <div className="emoji emoji-button">🫃🏿</div>
          <div className="emoji emoji-button">🤱🏿</div>
          <div className="emoji emoji-button">👩🏿‍🍼</div>
          <div className="emoji emoji-button">🧑🏿‍🍼</div>
          <div className="emoji emoji-button">👨🏿‍🍼</div>
          <div className="emoji emoji-button">🙇🏿‍♀️</div>
          <div className="emoji emoji-button">🙇🏿</div>
          <div className="emoji emoji-button">🙇🏿‍♂️</div>
          <div className="emoji emoji-button">💁🏿‍♀️</div>
          <div className="emoji emoji-button">💁🏿</div>
          <div className="emoji emoji-button">💁🏿‍♂️</div>
          <div className="emoji emoji-button">🙅🏿‍♀️</div>
          <div className="emoji emoji-button">🙅🏿</div>
          <div className="emoji emoji-button">🙅🏿‍♂️</div>
          <div className="emoji emoji-button">🙆🏿‍♀️</div>
          <div className="emoji emoji-button">🙆🏿</div>
          <div className="emoji emoji-button">🙆🏿‍♂️</div>
          <div className="emoji emoji-button">🙋🏿‍♀️</div>
          <div className="emoji emoji-button">🙋🏿</div>
          <div className="emoji emoji-button">🙋🏿‍♂️</div>
          <div className="emoji emoji-button">🧏🏿‍♀️</div>
          <div className="emoji emoji-button">🧏🏿</div>
          <div className="emoji emoji-button">🧏🏿‍♂️</div>
          <div className="emoji emoji-button">🤦🏿‍♀️</div>
          <div className="emoji emoji-button">🤦🏿</div>
          <div className="emoji emoji-button">🤦🏿‍♂️</div>
          <div className="emoji emoji-button">🤷🏿‍♀️</div>
          <div className="emoji emoji-button">🤷🏿</div>
          <div className="emoji emoji-button">🤷🏿‍♂️</div>
          <div className="emoji emoji-button">🙎🏿‍♀️</div>
          <div className="emoji emoji-button">🙎🏿</div>
          <div className="emoji emoji-button">🙎🏿‍♂️</div>
          <div className="emoji emoji-button">🙍🏿‍♀️</div>
          <div className="emoji emoji-button">🙍🏿</div>
          <div className="emoji emoji-button">🙍🏿‍♂️</div>
          <div className="emoji emoji-button">💇🏿‍♀️</div>
          <div className="emoji emoji-button">💇🏿</div>
          <div className="emoji emoji-button">💇🏿‍♂️</div>
          <div className="emoji emoji-button">💆🏿‍♀️</div>
          <div className="emoji emoji-button">💆🏿</div>
          <div className="emoji emoji-button">💆🏿‍♂️</div>
          <div className="emoji emoji-button">🧖🏿‍♀️</div>
          <div className="emoji emoji-button">🧖🏿</div>
          <div className="emoji emoji-button">🧖🏿‍♂️</div>
          <div className="emoji emoji-button">🧑🏿‍🩰</div>
          <div className="emoji emoji-button">💃🏿</div>
          <div className="emoji emoji-button">🕺🏿</div>
          <div className="emoji emoji-button">🕴🏿</div>
          <div className="emoji emoji-button">👩🏿‍🦽</div>
          <div className="emoji emoji-button">👩🏿‍🦽‍➡️</div>
          <div className="emoji emoji-button">🧑🏿‍🦽</div>
          <div className="emoji emoji-button">🧑🏿‍🦽‍➡️</div>
          <div className="emoji emoji-button">👨🏿‍🦽</div>
          <div className="emoji emoji-button">👨🏿‍🦽‍➡️</div>
          <div className="emoji emoji-button">👩🏿‍🦼</div>
          <div className="emoji emoji-button">👩🏿‍🦼‍➡️</div>
          <div className="emoji emoji-button">🧑🏿‍🦼</div>
          <div className="emoji emoji-button">🧑🏿‍🦼‍➡️</div>
          <div className="emoji emoji-button">👨🏿‍🦼</div>
          <div className="emoji emoji-button">👨🏿‍🦼‍➡️</div>
          <div className="emoji emoji-button">🚶🏿‍♀️</div>
          <div className="emoji emoji-button">🚶🏿‍♀️‍➡️</div>
          <div className="emoji emoji-button">🚶🏿</div>
          <div className="emoji emoji-button">🚶🏿‍➡️</div>
          <div className="emoji emoji-button">🚶🏿‍♂️</div>
          <div className="emoji emoji-button">🚶🏿‍♂️‍➡️</div>
          <div className="emoji emoji-button">👩🏿‍🦯</div>
          <div className="emoji emoji-button">👩🏿‍🦯‍➡️</div>
          <div className="emoji emoji-button">🧑🏿‍🦯</div>
          <div className="emoji emoji-button">🧑🏿‍🦯‍➡️</div>
          <div className="emoji emoji-button">👨🏿‍🦯</div>
          <div className="emoji emoji-button">👨🏿‍🦯‍➡️</div>
          <div className="emoji emoji-button">🧎🏿‍♀️</div>
          <div className="emoji emoji-button">🧎🏿‍♀️‍➡️</div>
          <div className="emoji emoji-button">🧎🏿</div>
          <div className="emoji emoji-button">🧎🏿‍➡️</div>
          <div className="emoji emoji-button">🧎🏿‍♂️</div>
          <div className="emoji emoji-button">🧎🏿‍♂️‍➡️</div>
          <div className="emoji emoji-button">🏃🏿‍♀️</div>
          <div className="emoji emoji-button">🏃🏿‍♀️‍➡️</div>
          <div className="emoji emoji-button">🏃🏿</div>
          <div className="emoji emoji-button">🏃🏿‍➡️</div>
          <div className="emoji emoji-button">🏃🏿‍♂️</div>
          <div className="emoji emoji-button">🏃🏿‍♂️‍➡️</div>
          <div className="emoji emoji-button">🧍🏿‍♀️</div>
          <div className="emoji emoji-button">🧍🏿</div>
          <div className="emoji emoji-button">🧍🏿‍♂️</div>
          <div className="emoji emoji-button">👭🏿</div>
          <div className="emoji emoji-button">🧑🏿‍🤝‍🧑🏿</div>
          <div className="emoji emoji-button">👬🏿</div>
          <div className="emoji emoji-button">👫🏿</div>
          <div className="emoji emoji-button">🧗🏿‍♀️</div>
          <div className="emoji emoji-button">🧗🏿</div>
          <div className="emoji emoji-button">🧗🏿‍♂️</div>
          <div className="emoji emoji-button">🏇🏿</div>
          <div className="emoji emoji-button">🏂🏿</div>
          <div className="emoji emoji-button">🏌🏿‍♀️</div>
          <div className="emoji emoji-button">🏌🏿</div>
          <div className="emoji emoji-button">🏌🏿‍♂️</div>
          <div className="emoji emoji-button">🏄🏿‍♀️</div>
          <div className="emoji emoji-button">🏄🏿</div>
          <div className="emoji emoji-button">🏄🏿‍♂️</div>
          <div className="emoji emoji-button">🚣🏿‍♀️</div>
          <div className="emoji emoji-button">🚣🏿</div>
          <div className="emoji emoji-button">🚣🏿‍♂️</div>
          <div className="emoji emoji-button">🏊🏿‍♀️</div>
          <div className="emoji emoji-button">🏊🏿</div>
          <div className="emoji emoji-button">🏊🏿‍♂️</div>
          <div className="emoji emoji-button">⛹🏿‍♀️</div>
          <div className="emoji emoji-button">⛹🏿</div>
          <div className="emoji emoji-button">⛹🏿‍♂️</div>
          <div className="emoji emoji-button">🏋🏿‍♀️</div>
          <div className="emoji emoji-button">🏋🏿</div>
          <div className="emoji emoji-button">🏋🏿‍♂️</div>
          <div className="emoji emoji-button">🚴🏿‍♀️</div>
          <div className="emoji emoji-button">🚴🏿</div>
          <div className="emoji emoji-button">🚴🏿‍♂️</div>
          <div className="emoji emoji-button">🚵🏿‍♀️</div>
          <div className="emoji emoji-button">🚵🏿</div>
          <div className="emoji emoji-button">🚵🏿‍♂️</div>
          <div className="emoji emoji-button">🤸🏿‍♀️</div>
          <div className="emoji emoji-button">🤸🏿</div>
          <div className="emoji emoji-button">🤸🏿‍♂️</div>
          <div className="emoji emoji-button">🤽🏿‍♀️</div>
          <div className="emoji emoji-button">🤽🏿</div>
          <div className="emoji emoji-button">🤽🏿‍♂️</div>
          <div className="emoji emoji-button">🤾🏿‍♀️</div>
          <div className="emoji emoji-button">🤾🏿</div>
          <div className="emoji emoji-button">🤾🏿‍♂️</div>
          <div className="emoji emoji-button">🤹🏿‍♀️</div>
          <div className="emoji emoji-button">🤹🏿</div>
          <div className="emoji emoji-button">🤹🏿‍♂️</div>
          <div className="emoji emoji-button">🧘🏿‍♀️</div>
          <div className="emoji emoji-button">🧘🏿</div>
          <div className="emoji emoji-button">🧘🏿‍♂️</div>
          <div className="emoji emoji-button">🛀🏿</div>
          <div className="emoji emoji-button">🛌🏿</div>
        </div>
      </section>
      <div
        className="flex w-full justify-center items-center min-h-[280px]"
        data-freestar-ad="__336x280 __970x250"
        id="getemoji.com_incontent_4_v3"
        data-ad-name="getemoji.com_incontent_4_v3"
        data-google-query-id="CNCBg9_tmpcDFa-GzgEduD4zMg"
      >
        <div
          id="google_ads_iframe_/21872898416/FS_getemoji_com_incontent_4_0__container__"
          style={{ border: "0pt", width: "468px", height: "0px" }}
        >
          <div className="__fs-ancillary" style={{ visibility: "hidden" }}>
            <div className="__fs-branding">
              <a
                href="https://ads.freestar.com/?utm_campaign=branding&amp;utm_medium=display&amp;utm_source=getemoji.com&amp;utm_content=getemoji.com_incontent_4_v3"
                target="_blank"
                rel="noreferrer"
                ><img
                  src="https://a.pub.network/core/imgs/fslogo-green.svg"
                  alt="freestar"
                  width="14"
                  height="14"
              /></a>
            </div>
            <div className="fs-branding-spacer"></div>
          </div>
        </div>
      </div>
      <section className="flex flex-col w-auto gap-4 mx-auto md:mx-0">
        <h2 id="animals-nature">
          <a
            title="Names and meanings of animal and nature emojis"
            href="https://emojipedia.org/nature"
            target="_blank"
            >Animals &amp; Nature</a
          >
        </h2>
        <form
          className="w-full flex overflow-hidden"
          role="search"
          action="https://emojipedia.org/search"
          method="get"
        >
          <input
            type="text"
            className="w-full h-10 p-4 border border-grey/10 rounded-tl-md rounded-bl-md focus:outline-blue/20"
            placeholder="Find emojis by name or description"
            id="srch-term"
            name="q"
          /><button
            type="submit"
            className="w-10 flex items-center justify-center border border-grey/10 rounded-tr-md rounded-br-md border-l-0 hover:bg-grey/10"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_1337_1457)">
                <path
                  d="M13.9043 12.8215L10.5848 9.50195C10.5219 9.43906 10.4398 9.40625 10.3523 9.40625H9.99141C10.8527 8.4082 11.375 7.10938 11.375 5.6875C11.375 2.5457 8.8293 0 5.6875 0C2.5457 0 0 2.5457 0 5.6875C0 8.8293 2.5457 11.375 5.6875 11.375C7.10938 11.375 8.4082 10.8527 9.40625 9.99141V10.3523C9.40625 10.4398 9.4418 10.5219 9.50195 10.5848L12.8215 13.9043C12.95 14.0328 13.1578 14.0328 13.2863 13.9043L13.9043 13.2863C14.0328 13.1578 14.0328 12.95 13.9043 12.8215ZM5.6875 10.0625C3.27031 10.0625 1.3125 8.10469 1.3125 5.6875C1.3125 3.27031 3.27031 1.3125 5.6875 1.3125C8.10469 1.3125 10.0625 3.27031 10.0625 5.6875C10.0625 8.10469 8.10469 10.0625 5.6875 10.0625Z"
                  fill="#111111"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0_1337_1457">
                  <rect width="14" height="14" fill="white"></rect>
                </clipPath>
              </defs>
            </svg>
          </button>
        </form>
        <div className="flex flex-wrap">
          <div className="emoji emoji-button">🐶</div>
          <div className="emoji emoji-button">🐱</div>
          <div className="emoji emoji-button">🐭</div>
          <div className="emoji emoji-button">🐹</div>
          <div className="emoji emoji-button">🐰</div>
          <div className="emoji emoji-button">🦊</div>
          <div className="emoji emoji-button">🐻</div>
          <div className="emoji emoji-button">🐼</div>
          <div className="emoji emoji-button">🐻‍❄️</div>
          <div className="emoji emoji-button">🐨</div>
          <div className="emoji emoji-button">🐯</div>
          <div className="emoji emoji-button">🦁</div>
          <div className="emoji emoji-button">🐮</div>
          <div className="emoji emoji-button">🐷</div>
          <div className="emoji emoji-button">🐽</div>
          <div className="emoji emoji-button">🐸</div>
          <div className="emoji emoji-button">🐵</div>
          <div className="emoji emoji-button">🙈</div>
          <div className="emoji emoji-button">🙉</div>
          <div className="emoji emoji-button">🙊</div>
          <div className="emoji emoji-button">🐒</div>
          <div className="emoji emoji-button">🐔</div>
          <div className="emoji emoji-button">🐧</div>
          <div className="emoji emoji-button">🐦</div>
          <div className="emoji emoji-button">🐦‍⬛</div>
          <div className="emoji emoji-button">🐤</div>
          <div className="emoji emoji-button">🐣</div>
          <div className="emoji emoji-button">🐥</div>
          <div className="emoji emoji-button">🦆</div>
          <div className="emoji emoji-button">🦅</div>
          <div className="emoji emoji-button">🦉</div>
          <div className="emoji emoji-button">🦇</div>
          <div className="emoji emoji-button">🐺</div>
          <div className="emoji emoji-button">🐗</div>
          <div className="emoji emoji-button">🐴</div>
          <div className="emoji emoji-button">🦄</div>
          <div className="emoji emoji-button">🐝</div>
          <div className="emoji emoji-button">🪱</div>
          <div className="emoji emoji-button">🐛</div>
          <div className="emoji emoji-button">🦋</div>
          <div className="emoji emoji-button">🐌</div>
          <div className="emoji emoji-button">🐞</div>
          <div className="emoji emoji-button">🐜</div>
          <div className="emoji emoji-button">🪰</div>
          <div className="emoji emoji-button">🪲</div>
          <div className="emoji emoji-button">🪳</div>
          <div className="emoji emoji-button">🦟</div>
          <div className="emoji emoji-button">🦗</div>
          <div className="emoji emoji-button">🕷</div>
          <div className="emoji emoji-button">🕸</div>
          <div className="emoji emoji-button">🦂</div>
          <div className="emoji emoji-button">🐢</div>
          <div className="emoji emoji-button">🐍</div>
          <div className="emoji emoji-button">🦎</div>
          <div className="emoji emoji-button">🦖</div>
          <div className="emoji emoji-button">🦕</div>
          <div className="emoji emoji-button">🐙</div>
          <div className="emoji emoji-button">🦑</div>
          <div className="emoji emoji-button">🦐</div>
          <div className="emoji emoji-button">🦞</div>
          <div className="emoji emoji-button">🦀</div>
          <div className="emoji emoji-button">🪼</div>
          <div className="emoji emoji-button">🪸</div>
          <div className="emoji emoji-button">🐡</div>
          <div className="emoji emoji-button">🐠</div>
          <div className="emoji emoji-button">🐟</div>
          <div className="emoji emoji-button">🐬</div>
          <div className="emoji emoji-button">🐳</div>
          <div className="emoji emoji-button">🐋</div>
          <div className="emoji emoji-button">🫍</div>
          <div className="emoji emoji-button">🦈</div>
          <div className="emoji emoji-button">🐊</div>
          <div className="emoji emoji-button">🐅</div>
          <div className="emoji emoji-button">🐆</div>
          <div className="emoji emoji-button">🦓</div>
          <div className="emoji emoji-button">🫏</div>
          <div className="emoji emoji-button">🦍</div>
          <div className="emoji emoji-button">🦧</div>
          <div className="emoji emoji-button">🦣</div>
          <div className="emoji emoji-button">🐘</div>
          <div className="emoji emoji-button">🦛</div>
          <div className="emoji emoji-button">🦏</div>
          <div className="emoji emoji-button">🐪</div>
          <div className="emoji emoji-button">🐫</div>
          <div className="emoji emoji-button">🦒</div>
          <div className="emoji emoji-button">🦘</div>
          <div className="emoji emoji-button">🦬</div>
          <div className="emoji emoji-button">🐃</div>
          <div className="emoji emoji-button">🐂</div>
          <div className="emoji emoji-button">🐄</div>
          <div className="emoji emoji-button">🐎</div>
          <div className="emoji emoji-button">🐖</div>
          <div className="emoji emoji-button">🐏</div>
          <div className="emoji emoji-button">🐑</div>
          <div className="emoji emoji-button">🦙</div>
          <div className="emoji emoji-button">🐐</div>
          <div className="emoji emoji-button">🦌</div>
          <div className="emoji emoji-button">🫎</div>
          <div className="emoji emoji-button">🐕</div>
          <div className="emoji emoji-button">🐩</div>
          <div className="emoji emoji-button">🦮</div>
          <div className="emoji emoji-button">🐕‍🦺</div>
          <div className="emoji emoji-button">🐈</div>
          <div className="emoji emoji-button">🐈‍⬛</div>
          <div className="emoji emoji-button">🪽</div>
          <div className="emoji emoji-button">🪶</div>
          <div className="emoji emoji-button">🐓</div>
          <div className="emoji emoji-button">🦃</div>
          <div className="emoji emoji-button">🦤</div>
          <div className="emoji emoji-button">🦚</div>
          <div className="emoji emoji-button">🦜</div>
          <div className="emoji emoji-button">🦢</div>
          <div className="emoji emoji-button">🪿</div>
          <div className="emoji emoji-button">🦩</div>
          <div className="emoji emoji-button">🕊</div>
          <div className="emoji emoji-button">🐇</div>
          <div className="emoji emoji-button">🦝</div>
          <div className="emoji emoji-button">🦨</div>
          <div className="emoji emoji-button">🦡</div>
          <div className="emoji emoji-button">🦫</div>
          <div className="emoji emoji-button">🦦</div>
          <div className="emoji emoji-button">🦥</div>
          <div className="emoji emoji-button">🐁</div>
          <div className="emoji emoji-button">🐀</div>
          <div className="emoji emoji-button">🐿</div>
          <div className="emoji emoji-button">🦔</div>
          <div className="emoji emoji-button">🐾</div>
          <div className="emoji emoji-button">🐉</div>
          <div className="emoji emoji-button">🐲</div>
          <div className="emoji emoji-button">🐦‍🔥</div>
          <div className="emoji emoji-button">🌵</div>
          <div className="emoji emoji-button">🎄</div>
          <div className="emoji emoji-button">🌲</div>
          <div className="emoji emoji-button">🌳</div>
          <div className="emoji emoji-button">🪾</div>
          <div className="emoji emoji-button">🌴</div>
          <div className="emoji emoji-button">🪹</div>
          <div className="emoji emoji-button">🪺</div>
          <div className="emoji emoji-button">🪵</div>
          <div className="emoji emoji-button">🌱</div>
          <div className="emoji emoji-button">🌿</div>
          <div className="emoji emoji-button">☘️</div>
          <div className="emoji emoji-button">🍀</div>
          <div className="emoji emoji-button">🎍</div>
          <div className="emoji emoji-button">🪴</div>
          <div className="emoji emoji-button">🎋</div>
          <div className="emoji emoji-button">🍃</div>
          <div className="emoji emoji-button">🍂</div>
          <div className="emoji emoji-button">🍁</div>
          <div className="emoji emoji-button">🍄</div>
          <div className="emoji emoji-button">🍄‍🟫</div>
          <div className="emoji emoji-button">🐚</div>
          <div className="emoji emoji-button">🪨</div>
          <div className="emoji emoji-button">🛘</div>
          <div className="emoji emoji-button">🌾</div>
          <div className="emoji emoji-button">💐</div>
          <div className="emoji emoji-button">🌷</div>
          <div className="emoji emoji-button">🪷</div>
          <div className="emoji emoji-button">🌹</div>
          <div className="emoji emoji-button">🥀</div>
          <div className="emoji emoji-button">🌺</div>
          <div className="emoji emoji-button">🌸</div>
          <div className="emoji emoji-button">🪻</div>
          <div className="emoji emoji-button">🌼</div>
          <div className="emoji emoji-button">🌻</div>
          <div className="emoji emoji-button">🌞</div>
          <div className="emoji emoji-button">🌝</div>
          <div className="emoji emoji-button">🌛</div>
          <div className="emoji emoji-button">🌜</div>
          <div className="emoji emoji-button">🌚</div>
          <div className="emoji emoji-button">🌕</div>
          <div className="emoji emoji-button">🌖</div>
          <div className="emoji emoji-button">🌗</div>
          <div className="emoji emoji-button">🌘</div>
          <div className="emoji emoji-button">🌑</div>
          <div className="emoji emoji-button">🌒</div>
          <div className="emoji emoji-button">🌓</div>
          <div className="emoji emoji-button">🌔</div>
          <div className="emoji emoji-button">🌙</div>
          <div className="emoji emoji-button">🌎</div>
          <div className="emoji emoji-button">🌍</div>
          <div className="emoji emoji-button">🌏</div>
          <div className="emoji emoji-button">🪐</div>
          <div className="emoji emoji-button">💫</div>
          <div className="emoji emoji-button">⭐️</div>
          <div className="emoji emoji-button">🌟</div>
          <div className="emoji emoji-button">✨</div>
          <div className="emoji emoji-button">⚡️</div>
          <div className="emoji emoji-button">☄️</div>
          <div className="emoji emoji-button">💥</div>
          <div className="emoji emoji-button">🔥</div>
          <div className="emoji emoji-button">🌪</div>
          <div className="emoji emoji-button">🌈</div>
          <div className="emoji emoji-button">☀️</div>
          <div className="emoji emoji-button">🌤</div>
          <div className="emoji emoji-button">⛅️</div>
          <div className="emoji emoji-button">🌥</div>
          <div className="emoji emoji-button">☁️</div>
          <div className="emoji emoji-button">🌦</div>
          <div className="emoji emoji-button">🌧</div>
          <div className="emoji emoji-button">⛈</div>
          <div className="emoji emoji-button">🌩</div>
          <div className="emoji emoji-button">🌨</div>
          <div className="emoji emoji-button">❄️</div>
          <div className="emoji emoji-button">☃️</div>
          <div className="emoji emoji-button">⛄️</div>
          <div className="emoji emoji-button">🌬</div>
          <div className="emoji emoji-button">💨</div>
          <div className="emoji emoji-button">💧</div>
          <div className="emoji emoji-button">💦</div>
          <div className="emoji emoji-button">🫧</div>
          <div className="emoji emoji-button">☔️</div>
          <div className="emoji emoji-button">☂️</div>
          <div className="emoji emoji-button">🌊</div>
        </div>
      </section>
      <section className="flex flex-col w-auto gap-4 mx-auto md:mx-0">
        <h2 id="food-drink">
          <a
            title="Names and meanings of food and drink emojis"
            href="https://emojipedia.org/food-drink"
            target="_blank"
            >Food &amp; Drink</a
          >
        </h2>
        <form
          className="w-full flex overflow-hidden"
          role="search"
          action="https://emojipedia.org/search"
          method="get"
        >
          <input
            type="text"
            className="w-full h-10 p-4 border border-grey/10 rounded-tl-md rounded-bl-md focus:outline-blue/20"
            placeholder="Find emojis by name or description"
            id="srch-term"
            name="q"
          /><button
            type="submit"
            className="w-10 flex items-center justify-center border border-grey/10 rounded-tr-md rounded-br-md border-l-0 hover:bg-grey/10"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_1337_1457)">
                <path
                  d="M13.9043 12.8215L10.5848 9.50195C10.5219 9.43906 10.4398 9.40625 10.3523 9.40625H9.99141C10.8527 8.4082 11.375 7.10938 11.375 5.6875C11.375 2.5457 8.8293 0 5.6875 0C2.5457 0 0 2.5457 0 5.6875C0 8.8293 2.5457 11.375 5.6875 11.375C7.10938 11.375 8.4082 10.8527 9.40625 9.99141V10.3523C9.40625 10.4398 9.4418 10.5219 9.50195 10.5848L12.8215 13.9043C12.95 14.0328 13.1578 14.0328 13.2863 13.9043L13.9043 13.2863C14.0328 13.1578 14.0328 12.95 13.9043 12.8215ZM5.6875 10.0625C3.27031 10.0625 1.3125 8.10469 1.3125 5.6875C1.3125 3.27031 3.27031 1.3125 5.6875 1.3125C8.10469 1.3125 10.0625 3.27031 10.0625 5.6875C10.0625 8.10469 8.10469 10.0625 5.6875 10.0625Z"
                  fill="#111111"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0_1337_1457">
                  <rect width="14" height="14" fill="white"></rect>
                </clipPath>
              </defs>
            </svg>
          </button>
        </form>
        <div className="flex flex-wrap">
          <div className="emoji emoji-button">🍏</div>
          <div className="emoji emoji-button">🍎</div>
          <div className="emoji emoji-button">🍐</div>
          <div className="emoji emoji-button">🍊</div>
          <div className="emoji emoji-button">🍋</div>
          <div className="emoji emoji-button">🍋‍🟩</div>
          <div className="emoji emoji-button">🍌</div>
          <div className="emoji emoji-button">🍉</div>
          <div className="emoji emoji-button">🍇</div>
          <div className="emoji emoji-button">🍓</div>
          <div className="emoji emoji-button">🫐</div>
          <div className="emoji emoji-button">🍈</div>
          <div className="emoji emoji-button">🍒</div>
          <div className="emoji emoji-button">🍑</div>
          <div className="emoji emoji-button">🥭</div>
          <div className="emoji emoji-button">🍍</div>
          <div className="emoji emoji-button">🥥</div>
          <div className="emoji emoji-button">🥝</div>
          <div className="emoji emoji-button">🍅</div>
          <div className="emoji emoji-button">🍆</div>
          <div className="emoji emoji-button">🥑</div>
          <div className="emoji emoji-button">🥦</div>
          <div className="emoji emoji-button">🫛</div>
          <div className="emoji emoji-button">🥬</div>
          <div className="emoji emoji-button">🫜</div>
          <div className="emoji emoji-button">🥒</div>
          <div className="emoji emoji-button">🌶</div>
          <div className="emoji emoji-button">🫑</div>
          <div className="emoji emoji-button">🌽</div>
          <div className="emoji emoji-button">🥕</div>
          <div className="emoji emoji-button">🫒</div>
          <div className="emoji emoji-button">🧄</div>
          <div className="emoji emoji-button">🧅</div>
          <div className="emoji emoji-button">🫚</div>
          <div className="emoji emoji-button">🥔</div>
          <div className="emoji emoji-button">🍠</div>
          <div className="emoji emoji-button">🫘</div>
          <div className="emoji emoji-button">🥐</div>
          <div className="emoji emoji-button">🥯</div>
          <div className="emoji emoji-button">🍞</div>
          <div className="emoji emoji-button">🥖</div>
          <div className="emoji emoji-button">🥨</div>
          <div className="emoji emoji-button">🧀</div>
          <div className="emoji emoji-button">🥚</div>
          <div className="emoji emoji-button">🍳</div>
          <div className="emoji emoji-button">🧈</div>
          <div className="emoji emoji-button">🥞</div>
          <div className="emoji emoji-button">🧇</div>
          <div className="emoji emoji-button">🥓</div>
          <div className="emoji emoji-button">🥩</div>
          <div className="emoji emoji-button">🍗</div>
          <div className="emoji emoji-button">🍖</div>
          <div className="emoji emoji-button">🦴</div>
          <div className="emoji emoji-button">🌭</div>
          <div className="emoji emoji-button">🍔</div>
          <div className="emoji emoji-button">🍟</div>
          <div className="emoji emoji-button">🍕</div>
          <div className="emoji emoji-button">🫓</div>
          <div className="emoji emoji-button">🥪</div>
          <div className="emoji emoji-button">🥙</div>
          <div className="emoji emoji-button">🧆</div>
          <div className="emoji emoji-button">🌮</div>
          <div className="emoji emoji-button">🌯</div>
          <div className="emoji emoji-button">🫔</div>
          <div className="emoji emoji-button">🥗</div>
          <div className="emoji emoji-button">🥘</div>
          <div className="emoji emoji-button">🫕</div>
          <div className="emoji emoji-button">🥫</div>
          <div className="emoji emoji-button">🍝</div>
          <div className="emoji emoji-button">🍜</div>
          <div className="emoji emoji-button">🍲</div>
          <div className="emoji emoji-button">🍛</div>
          <div className="emoji emoji-button">🍣</div>
          <div className="emoji emoji-button">🍱</div>
          <div className="emoji emoji-button">🥟</div>
          <div className="emoji emoji-button">🦪</div>
          <div className="emoji emoji-button">🍤</div>
          <div className="emoji emoji-button">🍙</div>
          <div className="emoji emoji-button">🍚</div>
          <div className="emoji emoji-button">🍘</div>
          <div className="emoji emoji-button">🍥</div>
          <div className="emoji emoji-button">🥠</div>
          <div className="emoji emoji-button">🥮</div>
          <div className="emoji emoji-button">🍢</div>
          <div className="emoji emoji-button">🍡</div>
          <div className="emoji emoji-button">🍧</div>
          <div className="emoji emoji-button">🍨</div>
          <div className="emoji emoji-button">🍦</div>
          <div className="emoji emoji-button">🥧</div>
          <div className="emoji emoji-button">🧁</div>
          <div className="emoji emoji-button">🍰</div>
          <div className="emoji emoji-button">🎂</div>
          <div className="emoji emoji-button">🍮</div>
          <div className="emoji emoji-button">🍭</div>
          <div className="emoji emoji-button">🍬</div>
          <div className="emoji emoji-button">🍫</div>
          <div className="emoji emoji-button">🍿</div>
          <div className="emoji emoji-button">🍩</div>
          <div className="emoji emoji-button">🍪</div>
          <div className="emoji emoji-button">🌰</div>
          <div className="emoji emoji-button">🥜</div>
          <div className="emoji emoji-button">🍯</div>
          <div className="emoji emoji-button">🥛</div>
          <div className="emoji emoji-button">🍼</div>
          <div className="emoji emoji-button">🫖</div>
          <div className="emoji emoji-button">☕️</div>
          <div className="emoji emoji-button">🍵</div>
          <div className="emoji emoji-button">🧃</div>
          <div className="emoji emoji-button">🥤</div>
          <div className="emoji emoji-button">🧋</div>
          <div className="emoji emoji-button">🫙</div>
          <div className="emoji emoji-button">🍶</div>
          <div className="emoji emoji-button">🍺</div>
          <div className="emoji emoji-button">🍻</div>
          <div className="emoji emoji-button">🥂</div>
          <div className="emoji emoji-button">🍷</div>
          <div className="emoji emoji-button">🫗</div>
          <div className="emoji emoji-button">🥃</div>
          <div className="emoji emoji-button">🍸</div>
          <div className="emoji emoji-button">🍹</div>
          <div className="emoji emoji-button">🧉</div>
          <div className="emoji emoji-button">🍾</div>
          <div className="emoji emoji-button">🧊</div>
          <div className="emoji emoji-button">🥄</div>
          <div className="emoji emoji-button">🍴</div>
          <div className="emoji emoji-button">🍽</div>
          <div className="emoji emoji-button">🥣</div>
          <div className="emoji emoji-button">🥡</div>
          <div className="emoji emoji-button">🥢</div>
          <div className="emoji emoji-button">🧂</div>
        </div>
      </section>
      <section className="flex flex-col w-auto gap-4 mx-auto md:mx-0">
        <h2 id="activities">
          <a
            title="Names and meanings of sport and activity emojis"
            href="https://emojipedia.org/activity"
            target="_blank"
            >Activity and Sports</a
          >
        </h2>
        <form
          className="w-full flex overflow-hidden"
          role="search"
          action="https://emojipedia.org/search"
          method="get"
        >
          <input
            type="text"
            className="w-full h-10 p-4 border border-grey/10 rounded-tl-md rounded-bl-md focus:outline-blue/20"
            placeholder="Find emojis by name or description"
            id="srch-term"
            name="q"
          /><button
            type="submit"
            className="w-10 flex items-center justify-center border border-grey/10 rounded-tr-md rounded-br-md border-l-0 hover:bg-grey/10"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_1337_1457)">
                <path
                  d="M13.9043 12.8215L10.5848 9.50195C10.5219 9.43906 10.4398 9.40625 10.3523 9.40625H9.99141C10.8527 8.4082 11.375 7.10938 11.375 5.6875C11.375 2.5457 8.8293 0 5.6875 0C2.5457 0 0 2.5457 0 5.6875C0 8.8293 2.5457 11.375 5.6875 11.375C7.10938 11.375 8.4082 10.8527 9.40625 9.99141V10.3523C9.40625 10.4398 9.4418 10.5219 9.50195 10.5848L12.8215 13.9043C12.95 14.0328 13.1578 14.0328 13.2863 13.9043L13.9043 13.2863C14.0328 13.1578 14.0328 12.95 13.9043 12.8215ZM5.6875 10.0625C3.27031 10.0625 1.3125 8.10469 1.3125 5.6875C1.3125 3.27031 3.27031 1.3125 5.6875 1.3125C8.10469 1.3125 10.0625 3.27031 10.0625 5.6875C10.0625 8.10469 8.10469 10.0625 5.6875 10.0625Z"
                  fill="#111111"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0_1337_1457">
                  <rect width="14" height="14" fill="white"></rect>
                </clipPath>
              </defs>
            </svg>
          </button>
        </form>
        <div className="flex flex-wrap">
          <div className="emoji emoji-button">⚽️</div>
          <div className="emoji emoji-button">🏀</div>
          <div className="emoji emoji-button">🏈</div>
          <div className="emoji emoji-button">⚾️</div>
          <div className="emoji emoji-button">🥎</div>
          <div className="emoji emoji-button">🎾</div>
          <div className="emoji emoji-button">🏐</div>
          <div className="emoji emoji-button">🏉</div>
          <div className="emoji emoji-button">🥏</div>
          <div className="emoji emoji-button">🎱</div>
          <div className="emoji emoji-button">🪀</div>
          <div className="emoji emoji-button">🏓</div>
          <div className="emoji emoji-button">🏸</div>
          <div className="emoji emoji-button">🏒</div>
          <div className="emoji emoji-button">🏑</div>
          <div className="emoji emoji-button">🥍</div>
          <div className="emoji emoji-button">🏏</div>
          <div className="emoji emoji-button">🪃</div>
          <div className="emoji emoji-button">🥅</div>
          <div className="emoji emoji-button">⛳️</div>
          <div className="emoji emoji-button">🪁</div>
          <div className="emoji emoji-button">🏹</div>
          <div className="emoji emoji-button">🎣</div>
          <div className="emoji emoji-button">🤿</div>
          <div className="emoji emoji-button">🥊</div>
          <div className="emoji emoji-button">🥋</div>
          <div className="emoji emoji-button">🎽</div>
          <div className="emoji emoji-button">🛹</div>
          <div className="emoji emoji-button">🛼</div>
          <div className="emoji emoji-button">🛷</div>
          <div className="emoji emoji-button">⛸</div>
          <div className="emoji emoji-button">🥌</div>
          <div className="emoji emoji-button">🎿</div>
          <div className="emoji emoji-button">⛷</div>
          <div className="emoji emoji-button">🏂</div>
          <div className="emoji emoji-button">🪂</div>
          <div className="emoji emoji-button">🏋️‍♀️</div>
          <div className="emoji emoji-button">🏋️</div>
          <div className="emoji emoji-button">🏋️‍♂️</div>
          <div className="emoji emoji-button">🤼‍♀️</div>
          <div className="emoji emoji-button">🤼</div>
          <div className="emoji emoji-button">🤼‍♂️</div>
          <div className="emoji emoji-button">🤸‍♀️</div>
          <div className="emoji emoji-button">🤸</div>
          <div className="emoji emoji-button">🤸‍♂️</div>
          <div className="emoji emoji-button">⛹️‍♀️</div>
          <div className="emoji emoji-button">⛹️</div>
          <div className="emoji emoji-button">⛹️‍♂️</div>
          <div className="emoji emoji-button">🤺</div>
          <div className="emoji emoji-button">🤾‍♀️</div>
          <div className="emoji emoji-button">🤾</div>
          <div className="emoji emoji-button">🤾‍♂️</div>
          <div className="emoji emoji-button">🏌️‍♀️</div>
          <div className="emoji emoji-button">🏌️</div>
          <div className="emoji emoji-button">🏌️‍♂️</div>
          <div className="emoji emoji-button">🏇</div>
          <div className="emoji emoji-button">🧘‍♀️</div>
          <div className="emoji emoji-button">🧘</div>
          <div className="emoji emoji-button">🧘‍♂️</div>
          <div className="emoji emoji-button">🏄‍♀️</div>
          <div className="emoji emoji-button">🏄</div>
          <div className="emoji emoji-button">🏄‍♂️</div>
          <div className="emoji emoji-button">🏊‍♀️</div>
          <div className="emoji emoji-button">🏊</div>
          <div className="emoji emoji-button">🏊‍♂️</div>
          <div className="emoji emoji-button">🤽‍♀️</div>
          <div className="emoji emoji-button">🤽</div>
          <div className="emoji emoji-button">🤽‍♂️</div>
          <div className="emoji emoji-button">🚣‍♀️</div>
          <div className="emoji emoji-button">🚣</div>
          <div className="emoji emoji-button">🚣‍♂️</div>
          <div className="emoji emoji-button">🧗‍♀️</div>
          <div className="emoji emoji-button">🧗</div>
          <div className="emoji emoji-button">🧗‍♂️</div>
          <div className="emoji emoji-button">🚵‍♀️</div>
          <div className="emoji emoji-button">🚵</div>
          <div className="emoji emoji-button">🚵‍♂️</div>
          <div className="emoji emoji-button">🚴‍♀️</div>
          <div className="emoji emoji-button">🚴</div>
          <div className="emoji emoji-button">🚴‍♂️</div>
          <div className="emoji emoji-button">🏆</div>
          <div className="emoji emoji-button">🥇</div>
          <div className="emoji emoji-button">🥈</div>
          <div className="emoji emoji-button">🥉</div>
          <div className="emoji emoji-button">🏅</div>
          <div className="emoji emoji-button">🎖</div>
          <div className="emoji emoji-button">🏵</div>
          <div className="emoji emoji-button">🎗</div>
          <div className="emoji emoji-button">🎫</div>
          <div className="emoji emoji-button">🎟</div>
          <div className="emoji emoji-button">🎪</div>
          <div className="emoji emoji-button">🤹</div>
          <div className="emoji emoji-button">🤹‍♂️</div>
          <div className="emoji emoji-button">🤹‍♀️</div>
          <div className="emoji emoji-button">🎭</div>
          <div className="emoji emoji-button">🩰</div>
          <div className="emoji emoji-button">🎨</div>
          <div className="emoji emoji-button">🎬</div>
          <div className="emoji emoji-button">🎤</div>
          <div className="emoji emoji-button">🎧</div>
          <div className="emoji emoji-button">🎼</div>
          <div className="emoji emoji-button">🎹</div>
          <div className="emoji emoji-button">🥁</div>
          <div className="emoji emoji-button">🪘</div>
          <div className="emoji emoji-button">🪇</div>
          <div className="emoji emoji-button">🎷</div>
          <div className="emoji emoji-button">🎺</div>
          <div className="emoji emoji-button">🪊</div>
          <div className="emoji emoji-button">🪗</div>
          <div className="emoji emoji-button">🎸</div>
          <div className="emoji emoji-button">🪕</div>
          <div className="emoji emoji-button">🎻</div>
          <div className="emoji emoji-button">🪈</div>
          <div className="emoji emoji-button">🎲</div>
          <div className="emoji emoji-button">♟</div>
          <div className="emoji emoji-button">🎯</div>
          <div className="emoji emoji-button">🎳</div>
          <div className="emoji emoji-button">🎮</div>
          <div className="emoji emoji-button">🎰</div>
          <div className="emoji emoji-button">🧩</div>
        </div>
      </section>
      <div
        className="flex w-full justify-center items-center min-h-[280px]"
        data-freestar-ad="__336x280 __970x250"
        id="getemoji.com_incontent_5_v3"
        data-ad-name="getemoji.com_incontent_5_v3"
        data-google-query-id="CNGBg9_tmpcDFa-GzgEduD4zMg"
      >
        <div
          id="google_ads_iframe_/21872898416/FS_getemoji_com_incontent_5_0__container__"
          style={{ border: "0pt", width: "468px", height: "0px" }}
        >
          <div className="__fs-ancillary" style={{ visibility: "hidden" }}>
            <div className="__fs-branding">
              <a
                href="https://ads.freestar.com/?utm_campaign=branding&amp;utm_medium=display&amp;utm_source=getemoji.com&amp;utm_content=getemoji.com_incontent_5_v3"
                target="_blank"
                rel="noreferrer"
                ><img
                  src="https://a.pub.network/core/imgs/fslogo-green.svg"
                  alt="freestar"
                  width="14"
                  height="14"
              /></a>
            </div>
            <div className="fs-branding-spacer"></div>
          </div>
        </div>
      </div>
      <section className="flex flex-col w-auto gap-4 mx-auto md:mx-0">
        <h2 id="travel-places">
          <a
            title="Names and meanings of travel and place emojis"
            href="https://emojipedia.org/travel-places"
            target="_blank"
            >Travel &amp; Places</a
          >
        </h2>
        <form
          className="w-full flex overflow-hidden"
          role="search"
          action="https://emojipedia.org/search"
          method="get"
        >
          <input
            type="text"
            className="w-full h-10 p-4 border border-grey/10 rounded-tl-md rounded-bl-md focus:outline-blue/20"
            placeholder="Find emojis by name or description"
            id="srch-term"
            name="q"
          /><button
            type="submit"
            className="w-10 flex items-center justify-center border border-grey/10 rounded-tr-md rounded-br-md border-l-0 hover:bg-grey/10"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_1337_1457)">
                <path
                  d="M13.9043 12.8215L10.5848 9.50195C10.5219 9.43906 10.4398 9.40625 10.3523 9.40625H9.99141C10.8527 8.4082 11.375 7.10938 11.375 5.6875C11.375 2.5457 8.8293 0 5.6875 0C2.5457 0 0 2.5457 0 5.6875C0 8.8293 2.5457 11.375 5.6875 11.375C7.10938 11.375 8.4082 10.8527 9.40625 9.99141V10.3523C9.40625 10.4398 9.4418 10.5219 9.50195 10.5848L12.8215 13.9043C12.95 14.0328 13.1578 14.0328 13.2863 13.9043L13.9043 13.2863C14.0328 13.1578 14.0328 12.95 13.9043 12.8215ZM5.6875 10.0625C3.27031 10.0625 1.3125 8.10469 1.3125 5.6875C1.3125 3.27031 3.27031 1.3125 5.6875 1.3125C8.10469 1.3125 10.0625 3.27031 10.0625 5.6875C10.0625 8.10469 8.10469 10.0625 5.6875 10.0625Z"
                  fill="#111111"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0_1337_1457">
                  <rect width="14" height="14" fill="white"></rect>
                </clipPath>
              </defs>
            </svg>
          </button>
        </form>
        <div className="flex flex-wrap">
          <div className="emoji emoji-button">🚗</div>
          <div className="emoji emoji-button">🚕</div>
          <div className="emoji emoji-button">🚙</div>
          <div className="emoji emoji-button">🚌</div>
          <div className="emoji emoji-button">🚎</div>
          <div className="emoji emoji-button">🏎</div>
          <div className="emoji emoji-button">🚓</div>
          <div className="emoji emoji-button">🚑</div>
          <div className="emoji emoji-button">🚒</div>
          <div className="emoji emoji-button">🚐</div>
          <div className="emoji emoji-button">🛻</div>
          <div className="emoji emoji-button">🚚</div>
          <div className="emoji emoji-button">🚛</div>
          <div className="emoji emoji-button">🚜</div>
          <div className="emoji emoji-button">🦯</div>
          <div className="emoji emoji-button">🦽</div>
          <div className="emoji emoji-button">🦼</div>
          <div className="emoji emoji-button">🛴</div>
          <div className="emoji emoji-button">🚲</div>
          <div className="emoji emoji-button">🛵</div>
          <div className="emoji emoji-button">🏍</div>
          <div className="emoji emoji-button">🛺</div>
          <div className="emoji emoji-button">🚨</div>
          <div className="emoji emoji-button">🚔</div>
          <div className="emoji emoji-button">🚍</div>
          <div className="emoji emoji-button">🚘</div>
          <div className="emoji emoji-button">🚖</div>
          <div className="emoji emoji-button">🛞</div>
          <div className="emoji emoji-button">🚡</div>
          <div className="emoji emoji-button">🚠</div>
          <div className="emoji emoji-button">🚟</div>
          <div className="emoji emoji-button">🚃</div>
          <div className="emoji emoji-button">🚋</div>
          <div className="emoji emoji-button">🚞</div>
          <div className="emoji emoji-button">🚝</div>
          <div className="emoji emoji-button">🚄</div>
          <div className="emoji emoji-button">🚅</div>
          <div className="emoji emoji-button">🚈</div>
          <div className="emoji emoji-button">🚂</div>
          <div className="emoji emoji-button">🚆</div>
          <div className="emoji emoji-button">🚇</div>
          <div className="emoji emoji-button">🚊</div>
          <div className="emoji emoji-button">🚉</div>
          <div className="emoji emoji-button">✈️</div>
          <div className="emoji emoji-button">🛫</div>
          <div className="emoji emoji-button">🛬</div>
          <div className="emoji emoji-button">🛩</div>
          <div className="emoji emoji-button">💺</div>
          <div className="emoji emoji-button">🛰</div>
          <div className="emoji emoji-button">🚀</div>
          <div className="emoji emoji-button">🛸</div>
          <div className="emoji emoji-button">🚁</div>
          <div className="emoji emoji-button">🛶</div>
          <div className="emoji emoji-button">⛵️</div>
          <div className="emoji emoji-button">🚤</div>
          <div className="emoji emoji-button">🛥</div>
          <div className="emoji emoji-button">🛳</div>
          <div className="emoji emoji-button">⛴</div>
          <div className="emoji emoji-button">🚢</div>
          <div className="emoji emoji-button">⚓️</div>
          <div className="emoji emoji-button">🛟</div>
          <div className="emoji emoji-button">🪝</div>
          <div className="emoji emoji-button">⛽️</div>
          <div className="emoji emoji-button">🚧</div>
          <div className="emoji emoji-button">🚦</div>
          <div className="emoji emoji-button">🚥</div>
          <div className="emoji emoji-button">🚏</div>
          <div className="emoji emoji-button">🗺</div>
          <div className="emoji emoji-button">🗿</div>
          <div className="emoji emoji-button">🗽</div>
          <div className="emoji emoji-button">🗼</div>
          <div className="emoji emoji-button">🏰</div>
          <div className="emoji emoji-button">🏯</div>
          <div className="emoji emoji-button">🏟</div>
          <div className="emoji emoji-button">🎡</div>
          <div className="emoji emoji-button">🎢</div>
          <div className="emoji emoji-button">🛝</div>
          <div className="emoji emoji-button">🎠</div>
          <div className="emoji emoji-button">⛲️</div>
          <div className="emoji emoji-button">⛱</div>
          <div className="emoji emoji-button">🏖</div>
          <div className="emoji emoji-button">🏝</div>
          <div className="emoji emoji-button">🏜</div>
          <div className="emoji emoji-button">🌋</div>
          <div className="emoji emoji-button">⛰</div>
          <div className="emoji emoji-button">🏔</div>
          <div className="emoji emoji-button">🗻</div>
          <div className="emoji emoji-button">🏕</div>
          <div className="emoji emoji-button">⛺️</div>
          <div className="emoji emoji-button">🛖</div>
          <div className="emoji emoji-button">🏠</div>
          <div className="emoji emoji-button">🏡</div>
          <div className="emoji emoji-button">🏘</div>
          <div className="emoji emoji-button">🏚</div>
          <div className="emoji emoji-button">🏗</div>
          <div className="emoji emoji-button">🏭</div>
          <div className="emoji emoji-button">🏢</div>
          <div className="emoji emoji-button">🏬</div>
          <div className="emoji emoji-button">🏣</div>
          <div className="emoji emoji-button">🏤</div>
          <div className="emoji emoji-button">🏥</div>
          <div className="emoji emoji-button">🏦</div>
          <div className="emoji emoji-button">🏨</div>
          <div className="emoji emoji-button">🏪</div>
          <div className="emoji emoji-button">🏫</div>
          <div className="emoji emoji-button">🏩</div>
          <div className="emoji emoji-button">💒</div>
          <div className="emoji emoji-button">🏛</div>
          <div className="emoji emoji-button">⛪️</div>
          <div className="emoji emoji-button">🕌</div>
          <div className="emoji emoji-button">🕍</div>
          <div className="emoji emoji-button">🛕</div>
          <div className="emoji emoji-button">🕋</div>
          <div className="emoji emoji-button">⛩</div>
          <div className="emoji emoji-button">🛤</div>
          <div className="emoji emoji-button">🛣</div>
          <div className="emoji emoji-button">🗾</div>
          <div className="emoji emoji-button">🎑</div>
          <div className="emoji emoji-button">🏞</div>
          <div className="emoji emoji-button">🌅</div>
          <div className="emoji emoji-button">🌄</div>
          <div className="emoji emoji-button">🌠</div>
          <div className="emoji emoji-button">🎇</div>
          <div className="emoji emoji-button">🎆</div>
          <div className="emoji emoji-button">🌇</div>
          <div className="emoji emoji-button">🌆</div>
          <div className="emoji emoji-button">🏙</div>
          <div className="emoji emoji-button">🌃</div>
          <div className="emoji emoji-button">🌌</div>
          <div className="emoji emoji-button">🌉</div>
          <div className="emoji emoji-button">🌁</div>
        </div>
      </section>
      <section className="flex flex-col w-auto gap-4 mx-auto md:mx-0">
        <h2 id="objects">
          <a
            title="Names and meanings of object emoji"
            href="https://emojipedia.org/objects"
            target="_blank"
            >Objects</a
          >
        </h2>
        <form
          className="w-full flex overflow-hidden"
          role="search"
          action="https://emojipedia.org/search"
          method="get"
        >
          <input
            type="text"
            className="w-full h-10 p-4 border border-grey/10 rounded-tl-md rounded-bl-md focus:outline-blue/20"
            placeholder="Find emojis by name or description"
            id="srch-term"
            name="q"
          /><button
            type="submit"
            className="w-10 flex items-center justify-center border border-grey/10 rounded-tr-md rounded-br-md border-l-0 hover:bg-grey/10"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_1337_1457)">
                <path
                  d="M13.9043 12.8215L10.5848 9.50195C10.5219 9.43906 10.4398 9.40625 10.3523 9.40625H9.99141C10.8527 8.4082 11.375 7.10938 11.375 5.6875C11.375 2.5457 8.8293 0 5.6875 0C2.5457 0 0 2.5457 0 5.6875C0 8.8293 2.5457 11.375 5.6875 11.375C7.10938 11.375 8.4082 10.8527 9.40625 9.99141V10.3523C9.40625 10.4398 9.4418 10.5219 9.50195 10.5848L12.8215 13.9043C12.95 14.0328 13.1578 14.0328 13.2863 13.9043L13.9043 13.2863C14.0328 13.1578 14.0328 12.95 13.9043 12.8215ZM5.6875 10.0625C3.27031 10.0625 1.3125 8.10469 1.3125 5.6875C1.3125 3.27031 3.27031 1.3125 5.6875 1.3125C8.10469 1.3125 10.0625 3.27031 10.0625 5.6875C10.0625 8.10469 8.10469 10.0625 5.6875 10.0625Z"
                  fill="#111111"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0_1337_1457">
                  <rect width="14" height="14" fill="white"></rect>
                </clipPath>
              </defs>
            </svg>
          </button>
        </form>
        <div className="flex flex-wrap">
          <div className="emoji emoji-button">⌚️</div>
          <div className="emoji emoji-button">📱</div>
          <div className="emoji emoji-button">📲</div>
          <div className="emoji emoji-button">💻</div>
          <div className="emoji emoji-button">⌨️</div>
          <div className="emoji emoji-button">🖥</div>
          <div className="emoji emoji-button">🖨</div>
          <div className="emoji emoji-button">🖱</div>
          <div className="emoji emoji-button">🖲</div>
          <div className="emoji emoji-button">🕹</div>
          <div className="emoji emoji-button">🗜</div>
          <div className="emoji emoji-button">💽</div>
          <div className="emoji emoji-button">💾</div>
          <div className="emoji emoji-button">💿</div>
          <div className="emoji emoji-button">📀</div>
          <div className="emoji emoji-button">📼</div>
          <div className="emoji emoji-button">📷</div>
          <div className="emoji emoji-button">📸</div>
          <div className="emoji emoji-button">📹</div>
          <div className="emoji emoji-button">🎥</div>
          <div className="emoji emoji-button">📽</div>
          <div className="emoji emoji-button">🎞</div>
          <div className="emoji emoji-button">📞</div>
          <div className="emoji emoji-button">☎️</div>
          <div className="emoji emoji-button">📟</div>
          <div className="emoji emoji-button">📠</div>
          <div className="emoji emoji-button">📺</div>
          <div className="emoji emoji-button">📻</div>
          <div className="emoji emoji-button">🎙</div>
          <div className="emoji emoji-button">🎚</div>
          <div className="emoji emoji-button">🎛</div>
          <div className="emoji emoji-button">🧭</div>
          <div className="emoji emoji-button">⏱</div>
          <div className="emoji emoji-button">⏲</div>
          <div className="emoji emoji-button">⏰</div>
          <div className="emoji emoji-button">🕰</div>
          <div className="emoji emoji-button">⌛️</div>
          <div className="emoji emoji-button">⏳</div>
          <div className="emoji emoji-button">📡</div>
          <div className="emoji emoji-button">🔋</div>
          <div className="emoji emoji-button">🪫</div>
          <div className="emoji emoji-button">🔌</div>
          <div className="emoji emoji-button">💡</div>
          <div className="emoji emoji-button">🔦</div>
          <div className="emoji emoji-button">🕯</div>
          <div className="emoji emoji-button">🪔</div>
          <div className="emoji emoji-button">🧯</div>
          <div className="emoji emoji-button">🛢</div>
          <div className="emoji emoji-button">🛍️</div>
          <div className="emoji emoji-button">💸</div>
          <div className="emoji emoji-button">💵</div>
          <div className="emoji emoji-button">💴</div>
          <div className="emoji emoji-button">💶</div>
          <div className="emoji emoji-button">💷</div>
          <div className="emoji emoji-button">🪙</div>
          <div className="emoji emoji-button">🪎</div>
          <div className="emoji emoji-button">💰</div>
          <div className="emoji emoji-button">💳</div>
          <div className="emoji emoji-button">💎</div>
          <div className="emoji emoji-button">⚖️</div>
          <div className="emoji emoji-button">🪮</div>
          <div className="emoji emoji-button">🪜</div>
          <div className="emoji emoji-button">🧰</div>
          <div className="emoji emoji-button">🪛</div>
          <div className="emoji emoji-button">🔧</div>
          <div className="emoji emoji-button">🔨</div>
          <div className="emoji emoji-button">⚒</div>
          <div className="emoji emoji-button">🛠</div>
          <div className="emoji emoji-button">⛏</div>
          <div className="emoji emoji-button">🪏</div>
          <div className="emoji emoji-button">🪚</div>
          <div className="emoji emoji-button">🔩</div>
          <div className="emoji emoji-button">⚙️</div>
          <div className="emoji emoji-button">🪤</div>
          <div className="emoji emoji-button">🧱</div>
          <div className="emoji emoji-button">⛓</div>
          <div className="emoji emoji-button">⛓️‍💥</div>
          <div className="emoji emoji-button">🧲</div>
          <div className="emoji emoji-button">🔫</div>
          <div className="emoji emoji-button">💣</div>
          <div className="emoji emoji-button">🧨</div>
          <div className="emoji emoji-button">🪓</div>
          <div className="emoji emoji-button">🔪</div>
          <div className="emoji emoji-button">🗡</div>
          <div className="emoji emoji-button">⚔️</div>
          <div className="emoji emoji-button">🛡</div>
          <div className="emoji emoji-button">🚬</div>
          <div className="emoji emoji-button">⚰️</div>
          <div className="emoji emoji-button">🪦</div>
          <div className="emoji emoji-button">⚱️</div>
          <div className="emoji emoji-button">🏺</div>
          <div className="emoji emoji-button">🔮</div>
          <div className="emoji emoji-button">📿</div>
          <div className="emoji emoji-button">🧿</div>
          <div className="emoji emoji-button">🪬</div>
          <div className="emoji emoji-button">💈</div>
          <div className="emoji emoji-button">⚗️</div>
          <div className="emoji emoji-button">🔭</div>
          <div className="emoji emoji-button">🔬</div>
          <div className="emoji emoji-button">🕳</div>
          <div className="emoji emoji-button">🩹</div>
          <div className="emoji emoji-button">🩺</div>
          <div className="emoji emoji-button">🩻</div>
          <div className="emoji emoji-button">🩼</div>
          <div className="emoji emoji-button">💊</div>
          <div className="emoji emoji-button">💉</div>
          <div className="emoji emoji-button">🩸</div>
          <div className="emoji emoji-button">🧬</div>
          <div className="emoji emoji-button">🦠</div>
          <div className="emoji emoji-button">🧫</div>
          <div className="emoji emoji-button">🧪</div>
          <div className="emoji emoji-button">🌡</div>
          <div className="emoji emoji-button">🧹</div>
          <div className="emoji emoji-button">🪠</div>
          <div className="emoji emoji-button">🧺</div>
          <div className="emoji emoji-button">🧻</div>
          <div className="emoji emoji-button">🚽</div>
          <div className="emoji emoji-button">🚰</div>
          <div className="emoji emoji-button">🚿</div>
          <div className="emoji emoji-button">🛁</div>
          <div className="emoji emoji-button">🛀</div>
          <div className="emoji emoji-button">🧼</div>
          <div className="emoji emoji-button">🪥</div>
          <div className="emoji emoji-button">🪒</div>
          <div className="emoji emoji-button">🧽</div>
          <div className="emoji emoji-button">🪣</div>
          <div className="emoji emoji-button">🧴</div>
          <div className="emoji emoji-button">🛎</div>
          <div className="emoji emoji-button">🔑</div>
          <div className="emoji emoji-button">🗝</div>
          <div className="emoji emoji-button">🚪</div>
          <div className="emoji emoji-button">🪑</div>
          <div className="emoji emoji-button">🛋</div>
          <div className="emoji emoji-button">🛏</div>
          <div className="emoji emoji-button">🛌</div>
          <div className="emoji emoji-button">🧸</div>
          <div className="emoji emoji-button">🪆</div>
          <div className="emoji emoji-button">🖼</div>
          <div className="emoji emoji-button">🪞</div>
          <div className="emoji emoji-button">🪟</div>
          <div className="emoji emoji-button">🛍</div>
          <div className="emoji emoji-button">🛒</div>
          <div className="emoji emoji-button">🎁</div>
          <div className="emoji emoji-button">🎈</div>
          <div className="emoji emoji-button">🎏</div>
          <div className="emoji emoji-button">🎀</div>
          <div className="emoji emoji-button">🪄</div>
          <div className="emoji emoji-button">🪅</div>
          <div className="emoji emoji-button">🎊</div>
          <div className="emoji emoji-button">🎉</div>
          <div className="emoji emoji-button">🪩</div>
          <div className="emoji emoji-button">🎎</div>
          <div className="emoji emoji-button">🏮</div>
          <div className="emoji emoji-button">🎐</div>
          <div className="emoji emoji-button">🧧</div>
          <div className="emoji emoji-button">✉️</div>
          <div className="emoji emoji-button">📩</div>
          <div className="emoji emoji-button">📨</div>
          <div className="emoji emoji-button">📧</div>
          <div className="emoji emoji-button">💌</div>
          <div className="emoji emoji-button">📥</div>
          <div className="emoji emoji-button">📤</div>
          <div className="emoji emoji-button">📦</div>
          <div className="emoji emoji-button">🏷</div>
          <div className="emoji emoji-button">🪧</div>
          <div className="emoji emoji-button">📪</div>
          <div className="emoji emoji-button">📫</div>
          <div className="emoji emoji-button">📬</div>
          <div className="emoji emoji-button">📭</div>
          <div className="emoji emoji-button">📮</div>
          <div className="emoji emoji-button">📯</div>
          <div className="emoji emoji-button">📜</div>
          <div className="emoji emoji-button">📃</div>
          <div className="emoji emoji-button">📄</div>
          <div className="emoji emoji-button">📑</div>
          <div className="emoji emoji-button">🧾</div>
          <div className="emoji emoji-button">📊</div>
          <div className="emoji emoji-button">📈</div>
          <div className="emoji emoji-button">📉</div>
          <div className="emoji emoji-button">🗒</div>
          <div className="emoji emoji-button">🗓</div>
          <div className="emoji emoji-button">📆</div>
          <div className="emoji emoji-button">📅</div>
          <div className="emoji emoji-button">🗑</div>
          <div className="emoji emoji-button">🪪</div>
          <div className="emoji emoji-button">📇</div>
          <div className="emoji emoji-button">🗃</div>
          <div className="emoji emoji-button">🗳</div>
          <div className="emoji emoji-button">🗄</div>
          <div className="emoji emoji-button">📋</div>
          <div className="emoji emoji-button">📁</div>
          <div className="emoji emoji-button">📂</div>
          <div className="emoji emoji-button">🗂</div>
          <div className="emoji emoji-button">🗞</div>
          <div className="emoji emoji-button">📰</div>
          <div className="emoji emoji-button">📓</div>
          <div className="emoji emoji-button">📔</div>
          <div className="emoji emoji-button">📒</div>
          <div className="emoji emoji-button">📕</div>
          <div className="emoji emoji-button">📗</div>
          <div className="emoji emoji-button">📘</div>
          <div className="emoji emoji-button">📙</div>
          <div className="emoji emoji-button">📚</div>
          <div className="emoji emoji-button">📖</div>
          <div className="emoji emoji-button">🔖</div>
          <div className="emoji emoji-button">🧷</div>
          <div className="emoji emoji-button">🔗</div>
          <div className="emoji emoji-button">📎</div>
          <div className="emoji emoji-button">🖇</div>
          <div className="emoji emoji-button">📐</div>
          <div className="emoji emoji-button">📏</div>
          <div className="emoji emoji-button">🧮</div>
          <div className="emoji emoji-button">📌</div>
          <div className="emoji emoji-button">📍</div>
          <div className="emoji emoji-button">✂️</div>
          <div className="emoji emoji-button">🖊</div>
          <div className="emoji emoji-button">🖋</div>
          <div className="emoji emoji-button">✒️</div>
          <div className="emoji emoji-button">🖌</div>
          <div className="emoji emoji-button">🖍</div>
          <div className="emoji emoji-button">📝</div>
          <div className="emoji emoji-button">✏️</div>
          <div className="emoji emoji-button">🔍</div>
          <div className="emoji emoji-button">🔎</div>
          <div className="emoji emoji-button">🔏</div>
          <div className="emoji emoji-button">🔐</div>
          <div className="emoji emoji-button">🔒</div>
          <div className="emoji emoji-button">🔓</div>
        </div>
      </section>
      <section className="flex flex-col w-auto gap-4 mx-auto md:mx-0">
        <h2 id="symbols">
          <a
            title="Names and meanings of hearts and symbol emojis"
            href="https://emojipedia.org/objects"
            target="_blank"
            >Symbols</a
          >
        </h2>
        <form
          className="w-full flex overflow-hidden"
          role="search"
          action="https://emojipedia.org/search"
          method="get"
        >
          <input
            type="text"
            className="w-full h-10 p-4 border border-grey/10 rounded-tl-md rounded-bl-md focus:outline-blue/20"
            placeholder="Find emojis by name or description"
            id="srch-term"
            name="q"
          /><button
            type="submit"
            className="w-10 flex items-center justify-center border border-grey/10 rounded-tr-md rounded-br-md border-l-0 hover:bg-grey/10"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_1337_1457)">
                <path
                  d="M13.9043 12.8215L10.5848 9.50195C10.5219 9.43906 10.4398 9.40625 10.3523 9.40625H9.99141C10.8527 8.4082 11.375 7.10938 11.375 5.6875C11.375 2.5457 8.8293 0 5.6875 0C2.5457 0 0 2.5457 0 5.6875C0 8.8293 2.5457 11.375 5.6875 11.375C7.10938 11.375 8.4082 10.8527 9.40625 9.99141V10.3523C9.40625 10.4398 9.4418 10.5219 9.50195 10.5848L12.8215 13.9043C12.95 14.0328 13.1578 14.0328 13.2863 13.9043L13.9043 13.2863C14.0328 13.1578 14.0328 12.95 13.9043 12.8215ZM5.6875 10.0625C3.27031 10.0625 1.3125 8.10469 1.3125 5.6875C1.3125 3.27031 3.27031 1.3125 5.6875 1.3125C8.10469 1.3125 10.0625 3.27031 10.0625 5.6875C10.0625 8.10469 8.10469 10.0625 5.6875 10.0625Z"
                  fill="#111111"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0_1337_1457">
                  <rect width="14" height="14" fill="white"></rect>
                </clipPath>
              </defs>
            </svg>
          </button>
        </form>
        <div className="flex flex-wrap">
          <div className="emoji emoji-button">❤️</div>
          <div className="emoji emoji-button">🩷</div>
          <div className="emoji emoji-button">🧡</div>
          <div className="emoji emoji-button">💛</div>
          <div className="emoji emoji-button">💚</div>
          <div className="emoji emoji-button">💙</div>
          <div className="emoji emoji-button">🩵</div>
          <div className="emoji emoji-button">💜</div>
          <div className="emoji emoji-button">🖤</div>
          <div className="emoji emoji-button">🩶</div>
          <div className="emoji emoji-button">🤍</div>
          <div className="emoji emoji-button">🤎</div>
          <div className="emoji emoji-button">❤️‍🔥</div>
          <div className="emoji emoji-button">❤️‍🩹</div>
          <div className="emoji emoji-button">💔</div>
          <div className="emoji emoji-button">❣️</div>
          <div className="emoji emoji-button">💕</div>
          <div className="emoji emoji-button">💞</div>
          <div className="emoji emoji-button">💓</div>
          <div className="emoji emoji-button">💗</div>
          <div className="emoji emoji-button">💖</div>
          <div className="emoji emoji-button">💘</div>
          <div className="emoji emoji-button">💝</div>
          <div className="emoji emoji-button">💟</div>
          <div className="emoji emoji-button">☮️</div>
          <div className="emoji emoji-button">✝️</div>
          <div className="emoji emoji-button">☪️</div>
          <div className="emoji emoji-button">🪯</div>
          <div className="emoji emoji-button">🕉</div>
          <div className="emoji emoji-button">☸️</div>
          <div className="emoji emoji-button">✡️</div>
          <div className="emoji emoji-button">🔯</div>
          <div className="emoji emoji-button">🕎</div>
          <div className="emoji emoji-button">☯️</div>
          <div className="emoji emoji-button">☦️</div>
          <div className="emoji emoji-button">🛐</div>
          <div className="emoji emoji-button">⛎</div>
          <div className="emoji emoji-button">♈️</div>
          <div className="emoji emoji-button">♉️</div>
          <div className="emoji emoji-button">♊️</div>
          <div className="emoji emoji-button">♋️</div>
          <div className="emoji emoji-button">♌️</div>
          <div className="emoji emoji-button">♍️</div>
          <div className="emoji emoji-button">♎️</div>
          <div className="emoji emoji-button">♏️</div>
          <div className="emoji emoji-button">♐️</div>
          <div className="emoji emoji-button">♑️</div>
          <div className="emoji emoji-button">♒️</div>
          <div className="emoji emoji-button">♓️</div>
          <div className="emoji emoji-button">🆔</div>
          <div className="emoji emoji-button">⚛️</div>
          <div className="emoji emoji-button">🉑</div>
          <div className="emoji emoji-button">☢️</div>
          <div className="emoji emoji-button">☣️</div>
          <div className="emoji emoji-button">📴</div>
          <div className="emoji emoji-button">📳</div>
          <div className="emoji emoji-button">🈶</div>
          <div className="emoji emoji-button">🈚️</div>
          <div className="emoji emoji-button">🈸</div>
          <div className="emoji emoji-button">🈺</div>
          <div className="emoji emoji-button">🈷️</div>
          <div className="emoji emoji-button">✴️</div>
          <div className="emoji emoji-button">🆚</div>
          <div className="emoji emoji-button">💮</div>
          <div className="emoji emoji-button">🉐</div>
          <div className="emoji emoji-button">㊙️</div>
          <div className="emoji emoji-button">㊗️</div>
          <div className="emoji emoji-button">🈴</div>
          <div className="emoji emoji-button">🈵</div>
          <div className="emoji emoji-button">🈹</div>
          <div className="emoji emoji-button">🈲</div>
          <div className="emoji emoji-button">🅰️</div>
          <div className="emoji emoji-button">🅱️</div>
          <div className="emoji emoji-button">🆎</div>
          <div className="emoji emoji-button">🆑</div>
          <div className="emoji emoji-button">🅾️</div>
          <div className="emoji emoji-button">🆘</div>
          <div className="emoji emoji-button">❌</div>
          <div className="emoji emoji-button">⭕️</div>
          <div className="emoji emoji-button">🛑</div>
          <div className="emoji emoji-button">⛔️</div>
          <div className="emoji emoji-button">📛</div>
          <div className="emoji emoji-button">🚫</div>
          <div className="emoji emoji-button">💯</div>
          <div className="emoji emoji-button">🫟</div>
          <div className="emoji emoji-button">💢</div>
          <div className="emoji emoji-button">🫯</div>
          <div className="emoji emoji-button">♨️</div>
          <div className="emoji emoji-button">🚷</div>
          <div className="emoji emoji-button">🚯</div>
          <div className="emoji emoji-button">🚳</div>
          <div className="emoji emoji-button">🚱</div>
          <div className="emoji emoji-button">🔞</div>
          <div className="emoji emoji-button">📵</div>
          <div className="emoji emoji-button">🚭</div>
          <div className="emoji emoji-button">❗️</div>
          <div className="emoji emoji-button">❕</div>
          <div className="emoji emoji-button">❓</div>
          <div className="emoji emoji-button">❔</div>
          <div className="emoji emoji-button">‼️</div>
          <div className="emoji emoji-button">⁉️</div>
          <div className="emoji emoji-button">🔅</div>
          <div className="emoji emoji-button">🔆</div>
          <div className="emoji emoji-button">〽️</div>
          <div className="emoji emoji-button">⚠️</div>
          <div className="emoji emoji-button">🚸</div>
          <div className="emoji emoji-button">🔱</div>
          <div className="emoji emoji-button">⚜️</div>
          <div className="emoji emoji-button">🔰</div>
          <div className="emoji emoji-button">♻️</div>
          <div className="emoji emoji-button">✅</div>
          <div className="emoji emoji-button">🈯️</div>
          <div className="emoji emoji-button">💹</div>
          <div className="emoji emoji-button">❇️</div>
          <div className="emoji emoji-button">✳️</div>
          <div className="emoji emoji-button">❎</div>
          <div className="emoji emoji-button">🌐</div>
          <div className="emoji emoji-button">💠</div>
          <div className="emoji emoji-button">Ⓜ️</div>
          <div className="emoji emoji-button">🌀</div>
          <div className="emoji emoji-button">💤</div>
          <div className="emoji emoji-button">🏧</div>
          <div className="emoji emoji-button">🚾</div>
          <div className="emoji emoji-button">♿️</div>
          <div className="emoji emoji-button">🅿️</div>
          <div className="emoji emoji-button">🛗</div>
          <div className="emoji emoji-button">🈳</div>
          <div className="emoji emoji-button">🈂️</div>
          <div className="emoji emoji-button">🛂</div>
          <div className="emoji emoji-button">🛃</div>
          <div className="emoji emoji-button">🛄</div>
          <div className="emoji emoji-button">🛅</div>
          <div className="emoji emoji-button">🚹</div>
          <div className="emoji emoji-button">🚺</div>
          <div className="emoji emoji-button">🚼</div>
          <div className="emoji emoji-button">⚧</div>
          <div className="emoji emoji-button">🚻</div>
          <div className="emoji emoji-button">🚮</div>
          <div className="emoji emoji-button">🎦</div>
          <div className="emoji emoji-button">🛜</div>
          <div className="emoji emoji-button">📶</div>
          <div className="emoji emoji-button">🈁</div>
          <div className="emoji emoji-button">🔣</div>
          <div className="emoji emoji-button">ℹ️</div>
          <div className="emoji emoji-button">🔤</div>
          <div className="emoji emoji-button">🔡</div>
          <div className="emoji emoji-button">🔠</div>
          <div className="emoji emoji-button">🆖</div>
          <div className="emoji emoji-button">🆗</div>
          <div className="emoji emoji-button">🆙</div>
          <div className="emoji emoji-button">🆒</div>
          <div className="emoji emoji-button">🆕</div>
          <div className="emoji emoji-button">🆓</div>
          <div className="emoji emoji-button">0️⃣</div>
          <div className="emoji emoji-button">1️⃣</div>
          <div className="emoji emoji-button">2️⃣</div>
          <div className="emoji emoji-button">3️⃣</div>
          <div className="emoji emoji-button">4️⃣</div>
          <div className="emoji emoji-button">5️⃣</div>
          <div className="emoji emoji-button">6️⃣</div>
          <div className="emoji emoji-button">7️⃣</div>
          <div className="emoji emoji-button">8️⃣</div>
          <div className="emoji emoji-button">9️⃣</div>
          <div className="emoji emoji-button">🔟</div>
          <div className="emoji emoji-button">🔢</div>
          <div className="emoji emoji-button">#️⃣</div>
          <div className="emoji emoji-button">*️⃣</div>
          <div className="emoji emoji-button">⏏️</div>
          <div className="emoji emoji-button">▶️</div>
          <div className="emoji emoji-button">⏸</div>
          <div className="emoji emoji-button">⏯</div>
          <div className="emoji emoji-button">⏹</div>
          <div className="emoji emoji-button">⏺</div>
          <div className="emoji emoji-button">⏭</div>
          <div className="emoji emoji-button">⏮</div>
          <div className="emoji emoji-button">⏩</div>
          <div className="emoji emoji-button">⏪</div>
          <div className="emoji emoji-button">⏫</div>
          <div className="emoji emoji-button">⏬</div>
          <div className="emoji emoji-button">◀️</div>
          <div className="emoji emoji-button">🔼</div>
          <div className="emoji emoji-button">🔽</div>
          <div className="emoji emoji-button">➡️</div>
          <div className="emoji emoji-button">⬅️</div>
          <div className="emoji emoji-button">⬆️</div>
          <div className="emoji emoji-button">⬇️</div>
          <div className="emoji emoji-button">↗️</div>
          <div className="emoji emoji-button">↘️</div>
          <div className="emoji emoji-button">↙️</div>
          <div className="emoji emoji-button">↖️</div>
          <div className="emoji emoji-button">↕️</div>
          <div className="emoji emoji-button">↔️</div>
          <div className="emoji emoji-button">↪️</div>
          <div className="emoji emoji-button">↩️</div>
          <div className="emoji emoji-button">⤴️</div>
          <div className="emoji emoji-button">⤵️</div>
          <div className="emoji emoji-button">🔀</div>
          <div className="emoji emoji-button">🔁</div>
          <div className="emoji emoji-button">🔂</div>
          <div className="emoji emoji-button">🔄</div>
          <div className="emoji emoji-button">🔃</div>
          <div className="emoji emoji-button">🎵</div>
          <div className="emoji emoji-button">🎶</div>
          <div className="emoji emoji-button">➕</div>
          <div className="emoji emoji-button">➖</div>
          <div className="emoji emoji-button">➗</div>
          <div className="emoji emoji-button">✖️</div>
          <div className="emoji emoji-button">🟰</div>
          <div className="emoji emoji-button">♾</div>
          <div className="emoji emoji-button">💲</div>
          <div className="emoji emoji-button">💱</div>
          <div className="emoji emoji-button">™️</div>
          <div className="emoji emoji-button">©️</div>
          <div className="emoji emoji-button">®️</div>
          <div className="emoji emoji-button">〰️</div>
          <div className="emoji emoji-button">➰</div>
          <div className="emoji emoji-button">➿</div>
          <div className="emoji emoji-button">🔚</div>
          <div className="emoji emoji-button">🔙</div>
          <div className="emoji emoji-button">🔛</div>
          <div className="emoji emoji-button">🔝</div>
          <div className="emoji emoji-button">🔜</div>
          <div className="emoji emoji-button">✔️</div>
          <div className="emoji emoji-button">☑️</div>
          <div className="emoji emoji-button">🔘</div>
          <div className="emoji emoji-button">🔴</div>
          <div className="emoji emoji-button">🟠</div>
          <div className="emoji emoji-button">🟡</div>
          <div className="emoji emoji-button">🟢</div>
          <div className="emoji emoji-button">🔵</div>
          <div className="emoji emoji-button">🟣</div>
          <div className="emoji emoji-button">⚫️</div>
          <div className="emoji emoji-button">⚪️</div>
          <div className="emoji emoji-button">🟤</div>
          <div className="emoji emoji-button">🔺</div>
          <div className="emoji emoji-button">🔻</div>
          <div className="emoji emoji-button">🔸</div>
          <div className="emoji emoji-button">🔹</div>
          <div className="emoji emoji-button">🔶</div>
          <div className="emoji emoji-button">🔷</div>
          <div className="emoji emoji-button">🔳</div>
          <div className="emoji emoji-button">🔲</div>
          <div className="emoji emoji-button">▪️</div>
          <div className="emoji emoji-button">▫️</div>
          <div className="emoji emoji-button">◾️</div>
          <div className="emoji emoji-button">◽️</div>
          <div className="emoji emoji-button">◼️</div>
          <div className="emoji emoji-button">◻️</div>
          <div className="emoji emoji-button">🟥</div>
          <div className="emoji emoji-button">🟧</div>
          <div className="emoji emoji-button">🟨</div>
          <div className="emoji emoji-button">🟩</div>
          <div className="emoji emoji-button">🟦</div>
          <div className="emoji emoji-button">🟪</div>
          <div className="emoji emoji-button">⬛️</div>
          <div className="emoji emoji-button">⬜️</div>
          <div className="emoji emoji-button">🟫</div>
          <div className="emoji emoji-button">🔈</div>
          <div className="emoji emoji-button">🔇</div>
          <div className="emoji emoji-button">🔉</div>
          <div className="emoji emoji-button">🔊</div>
          <div className="emoji emoji-button">🔔</div>
          <div className="emoji emoji-button">🔕</div>
          <div className="emoji emoji-button">📣</div>
          <div className="emoji emoji-button">📢</div>
          <div className="emoji emoji-button">👁‍🗨</div>
          <div className="emoji emoji-button">💬</div>
          <div className="emoji emoji-button">💭</div>
          <div className="emoji emoji-button">🗯</div>
          <div className="emoji emoji-button">♠️</div>
          <div className="emoji emoji-button">♣️</div>
          <div className="emoji emoji-button">♥️</div>
          <div className="emoji emoji-button">♦️</div>
          <div className="emoji emoji-button">🃏</div>
          <div className="emoji emoji-button">🎴</div>
          <div className="emoji emoji-button">🀄️</div>
          <div className="emoji emoji-button">🕐</div>
          <div className="emoji emoji-button">🕑</div>
          <div className="emoji emoji-button">🕒</div>
          <div className="emoji emoji-button">🕓</div>
          <div className="emoji emoji-button">🕔</div>
          <div className="emoji emoji-button">🕕</div>
          <div className="emoji emoji-button">🕖</div>
          <div className="emoji emoji-button">🕗</div>
          <div className="emoji emoji-button">🕘</div>
          <div className="emoji emoji-button">🕙</div>
          <div className="emoji emoji-button">🕚</div>
          <div className="emoji emoji-button">🕛</div>
          <div className="emoji emoji-button">🕜</div>
          <div className="emoji emoji-button">🕝</div>
          <div className="emoji emoji-button">🕞</div>
          <div className="emoji emoji-button">🕟</div>
          <div className="emoji emoji-button">🕠</div>
          <div className="emoji emoji-button">🕡</div>
          <div className="emoji emoji-button">🕢</div>
          <div className="emoji emoji-button">🕣</div>
          <div className="emoji emoji-button">🕤</div>
          <div className="emoji emoji-button">🕥</div>
          <div className="emoji emoji-button">🕦</div>
          <div className="emoji emoji-button">🕧</div>
        </div>
      </section>
      <div
        className="flex w-full justify-center items-center min-h-[280px]"
        data-freestar-ad="__336x280 __970x250"
        id="getemoji.com_incontent_6_v3"
        data-ad-name="getemoji.com_incontent_6_v3"
        data-google-query-id="CNKBg9_tmpcDFa-GzgEduD4zMg"
      >
        <div
          id="google_ads_iframe_/21872898416/FS_getemoji_com_incontent_6_0__container__"
          style={{ border: "0pt", width: "468px", height: "0px" }}
        >
          <div className="__fs-ancillary" style={{ visibility: "hidden" }}>
            <div className="__fs-branding">
              <a
                href="https://ads.freestar.com/?utm_campaign=branding&amp;utm_medium=display&amp;utm_source=getemoji.com&amp;utm_content=getemoji.com_incontent_6_v3"
                target="_blank"
                rel="noreferrer"
                ><img
                  src="https://a.pub.network/core/imgs/fslogo-green.svg"
                  alt="freestar"
                  width="14"
                  height="14"
              /></a>
            </div>
            <div className="fs-branding-spacer"></div>
          </div>
        </div>
      </div>
      <section className="flex flex-col w-auto gap-4 mx-auto md:mx-0">
        <h2>
          <a
            title="Names and meanings of smiley emojis"
            href="https://copychar.cc/"
            target="_blank"
            >Non-Emoji Symbols</a
          >
        </h2>
        <div>
          <p>
            More
            <a href="https://getsymbols.com"
              >Unicode symbols, Hieroglpyhs and Pictographs to copy and paste</a
            >.
          </p>
        </div>
        <div className="flex flex-wrap">
          <div className="emoji emoji-button">✢</div>
          <div className="emoji emoji-button">✣</div>
          <div className="emoji emoji-button">✤</div>
          <div className="emoji emoji-button">✥</div>
          <div className="emoji emoji-button">✦</div>
          <div className="emoji emoji-button">✧</div>
          <div className="emoji emoji-button">★</div>
          <div className="emoji emoji-button">☆</div>
          <div className="emoji emoji-button">✯</div>
          <div className="emoji emoji-button">✡︎</div>
          <div className="emoji emoji-button">✩</div>
          <div className="emoji emoji-button">✪</div>
          <div className="emoji emoji-button">✫</div>
          <div className="emoji emoji-button">✬</div>
          <div className="emoji emoji-button">✭</div>
          <div className="emoji emoji-button">✮</div>
          <div className="emoji emoji-button">✶</div>
          <div className="emoji emoji-button">✷</div>
          <div className="emoji emoji-button">✵</div>
          <div className="emoji emoji-button">✸</div>
          <div className="emoji emoji-button">✹</div>
          <div className="emoji emoji-button">→</div>
          <div className="emoji emoji-button">⇒</div>
          <div className="emoji emoji-button">⟹</div>
          <div className="emoji emoji-button">⇨</div>
          <div className="emoji emoji-button">⇾</div>
          <div className="emoji emoji-button">➾</div>
          <div className="emoji emoji-button">⇢</div>
          <div className="emoji emoji-button">☛</div>
          <div className="emoji emoji-button">☞</div>
          <div className="emoji emoji-button">➔</div>
          <div className="emoji emoji-button">➜</div>
          <div className="emoji emoji-button">➙</div>
          <div className="emoji emoji-button">➛</div>
          <div className="emoji emoji-button">➝</div>
          <div className="emoji emoji-button">➞</div>
          <div className="emoji emoji-button">♠︎</div>
          <div className="emoji emoji-button">♣︎</div>
          <div className="emoji emoji-button">♥︎</div>
          <div className="emoji emoji-button">♦︎</div>
          <div className="emoji emoji-button">♤</div>
          <div className="emoji emoji-button">♧</div>
          <div className="emoji emoji-button">♡</div>
          <div className="emoji emoji-button">♢</div>
          <div className="emoji emoji-button">♚</div>
          <div className="emoji emoji-button">♛</div>
          <div className="emoji emoji-button">♜</div>
          <div className="emoji emoji-button">♝</div>
          <div className="emoji emoji-button">♞</div>
          <div className="emoji emoji-button">♟</div>
          <div className="emoji emoji-button">♔</div>
          <div className="emoji emoji-button">♕</div>
          <div className="emoji emoji-button">♖</div>
          <div className="emoji emoji-button">♗</div>
          <div className="emoji emoji-button">♘</div>
          <div className="emoji emoji-button">♙</div>
          <div className="emoji emoji-button">⚀</div>
          <div className="emoji emoji-button">⚁</div>
          <div className="emoji emoji-button">⚂</div>
          <div className="emoji emoji-button">⚃</div>
          <div className="emoji emoji-button">⚄</div>
          <div className="emoji emoji-button">⚅</div>
          <div className="emoji emoji-button">🂠</div>
          <div className="emoji emoji-button">⚈</div>
          <div className="emoji emoji-button">⚉</div>
          <div className="emoji emoji-button">⚆</div>
          <div className="emoji emoji-button">⚇</div>
          <div className="emoji emoji-button">𓀀</div>
          <div className="emoji emoji-button">𓀁</div>
          <div className="emoji emoji-button">𓀂</div>
          <div className="emoji emoji-button">𓀃</div>
          <div className="emoji emoji-button">𓀄</div>
          <div className="emoji emoji-button">𓀅</div>
          <div className="emoji emoji-button">𓀆</div>
          <div className="emoji emoji-button">𓀇</div>
          <div className="emoji emoji-button">𓀈</div>
          <div className="emoji emoji-button">𓀉</div>
          <div className="emoji emoji-button">𓀊</div>
          <div className="emoji emoji-button">𓀋</div>
          <div className="emoji emoji-button">𓀌</div>
          <div className="emoji emoji-button">𓀍</div>
          <div className="emoji emoji-button">𓀎</div>
          <div className="emoji emoji-button">𓀏</div>
          <div className="emoji emoji-button">𓀐</div>
          <div className="emoji emoji-button">𓀑</div>
          <div className="emoji emoji-button">𓀒</div>
          <div className="emoji emoji-button">𓀓</div>
          <div className="emoji emoji-button">𓀔</div>
          <div className="emoji emoji-button">𓀕</div>
          <div className="emoji emoji-button">𓀖</div>
          <div className="emoji emoji-button">𓀗</div>
          <div className="emoji emoji-button">𓀘</div>
          <div className="emoji emoji-button">𓀙</div>
          <div className="emoji emoji-button">𓀚</div>
          <div className="emoji emoji-button">𓀛</div>
          <div className="emoji emoji-button">𓀜</div>
          <div className="emoji emoji-button">𓀝</div>
        </div>
      </section>
      <div
        className="flex w-full justify-center items-center min-h-[280px]"
        data-freestar-ad="__336x280 __970x250"
        id="getemoji.com_incontent_7_v3"
        data-ad-name="getemoji.com_incontent_7_v3"
        data-google-query-id="CNOBg9_tmpcDFa-GzgEduD4zMg"
      >
        <div
          id="google_ads_iframe_/21872898416/FS_getemoji_com_incontent_7_0__container__"
          style={{ border: "0pt", width: "468px", height: "0px" }}
        >
          <div className="__fs-ancillary" style={{ visibility: "hidden" }}>
            <div className="__fs-branding">
              <a
                href="https://ads.freestar.com/?utm_campaign=branding&amp;utm_medium=display&amp;utm_source=getemoji.com&amp;utm_content=getemoji.com_incontent_7_v3"
                target="_blank"
                rel="noreferrer"
                ><img
                  src="https://a.pub.network/core/imgs/fslogo-green.svg"
                  alt="freestar"
                  width="14"
                  height="14"
              /></a>
            </div>
            <div className="fs-branding-spacer"></div>
          </div>
        </div>
      </div>
      <section className="flex flex-col w-auto gap-4 mx-auto md:mx-0">
        <h2 id="flags">
          <a
            title="Names and meanings of Flag Emojis"
            href="https://emojipedia.org/flags"
            target="_blank"
            >Flags</a
          >
        </h2>
        <form
          className="w-full flex overflow-hidden"
          role="search"
          action="https://emojipedia.org/search"
          method="get"
        >
          <input
            type="text"
            className="w-full h-10 p-4 border border-grey/10 rounded-tl-md rounded-bl-md focus:outline-blue/20"
            placeholder="Find emojis by name or description"
            id="srch-term"
            name="q"
          /><button
            type="submit"
            className="w-10 flex items-center justify-center border border-grey/10 rounded-tr-md rounded-br-md border-l-0 hover:bg-grey/10"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_1337_1457)">
                <path
                  d="M13.9043 12.8215L10.5848 9.50195C10.5219 9.43906 10.4398 9.40625 10.3523 9.40625H9.99141C10.8527 8.4082 11.375 7.10938 11.375 5.6875C11.375 2.5457 8.8293 0 5.6875 0C2.5457 0 0 2.5457 0 5.6875C0 8.8293 2.5457 11.375 5.6875 11.375C7.10938 11.375 8.4082 10.8527 9.40625 9.99141V10.3523C9.40625 10.4398 9.4418 10.5219 9.50195 10.5848L12.8215 13.9043C12.95 14.0328 13.1578 14.0328 13.2863 13.9043L13.9043 13.2863C14.0328 13.1578 14.0328 12.95 13.9043 12.8215ZM5.6875 10.0625C3.27031 10.0625 1.3125 8.10469 1.3125 5.6875C1.3125 3.27031 3.27031 1.3125 5.6875 1.3125C8.10469 1.3125 10.0625 3.27031 10.0625 5.6875C10.0625 8.10469 8.10469 10.0625 5.6875 10.0625Z"
                  fill="#111111"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0_1337_1457">
                  <rect width="14" height="14" fill="white"></rect>
                </clipPath>
              </defs>
            </svg>
          </button>
        </form>
        <div>
          <p>
            Note: Windows has
            <a href="https://blog.emojipedia.org/emoji-flags-explained"
              >limited flag emoji support</a
            >.
          </p>
        </div>
        <div className="flex flex-wrap">
          <div className="emoji emoji-button">🏳️</div>
          <div className="emoji emoji-button">🏴</div>
          <div className="emoji emoji-button">🏁</div>
          <div className="emoji emoji-button">🚩</div>
          <div className="emoji emoji-button">🏳️‍🌈</div>
          <div className="emoji emoji-button">🏳️‍⚧️</div>
          <div className="emoji emoji-button">🏴‍☠️</div>
          <div className="emoji emoji-button">🇦🇫</div>
          <div className="emoji emoji-button">🇦🇽</div>
          <div className="emoji emoji-button">🇦🇱</div>
          <div className="emoji emoji-button">🇩🇿</div>
          <div className="emoji emoji-button">🇦🇸</div>
          <div className="emoji emoji-button">🇦🇩</div>
          <div className="emoji emoji-button">🇦🇴</div>
          <div className="emoji emoji-button">🇦🇮</div>
          <div className="emoji emoji-button">🇦🇶</div>
          <div className="emoji emoji-button">🇦🇬</div>
          <div className="emoji emoji-button">🇦🇷</div>
          <div className="emoji emoji-button">🇦🇲</div>
          <div className="emoji emoji-button">🇦🇼</div>
          <div className="emoji emoji-button">🇦🇺</div>
          <div className="emoji emoji-button">🇦🇹</div>
          <div className="emoji emoji-button">🇦🇿</div>
          <div className="emoji emoji-button">🇧🇸</div>
          <div className="emoji emoji-button">🇧🇭</div>
          <div className="emoji emoji-button">🇧🇩</div>
          <div className="emoji emoji-button">🇧🇧</div>
          <div className="emoji emoji-button">🇧🇾</div>
          <div className="emoji emoji-button">🇧🇪</div>
          <div className="emoji emoji-button">🇧🇿</div>
          <div className="emoji emoji-button">🇧🇯</div>
          <div className="emoji emoji-button">🇧🇲</div>
          <div className="emoji emoji-button">🇧🇹</div>
          <div className="emoji emoji-button">🇧🇴</div>
          <div className="emoji emoji-button">🇧🇦</div>
          <div className="emoji emoji-button">🇧🇼</div>
          <div className="emoji emoji-button">🇧🇷</div>
          <div className="emoji emoji-button">🇮🇴</div>
          <div className="emoji emoji-button">🇻🇬</div>
          <div className="emoji emoji-button">🇧🇳</div>
          <div className="emoji emoji-button">🇧🇬</div>
          <div className="emoji emoji-button">🇧🇫</div>
          <div className="emoji emoji-button">🇧🇮</div>
          <div className="emoji emoji-button">🇰🇭</div>
          <div className="emoji emoji-button">🇨🇲</div>
          <div className="emoji emoji-button">🇨🇦</div>
          <div className="emoji emoji-button">🇮🇨</div>
          <div className="emoji emoji-button">🇨🇻</div>
          <div className="emoji emoji-button">🇧🇶</div>
          <div className="emoji emoji-button">🇰🇾</div>
          <div className="emoji emoji-button">🇨🇫</div>
          <div className="emoji emoji-button">🇹🇩</div>
          <div className="emoji emoji-button">🇨🇱</div>
          <div className="emoji emoji-button">🇨🇳</div>
          <div className="emoji emoji-button">🇨🇽</div>
          <div className="emoji emoji-button">🇨🇨</div>
          <div className="emoji emoji-button">🇨🇴</div>
          <div className="emoji emoji-button">🇨🇵</div>
          <div className="emoji emoji-button">🇰🇲</div>
          <div className="emoji emoji-button">🇨🇬</div>
          <div className="emoji emoji-button">🇨🇩</div>
          <div className="emoji emoji-button">🇨🇰</div>
          <div className="emoji emoji-button">🇨🇶</div>
          <div className="emoji emoji-button">🇨🇷</div>
          <div className="emoji emoji-button">🇨🇮</div>
          <div className="emoji emoji-button">🇭🇷</div>
          <div className="emoji emoji-button">🇨🇺</div>
          <div className="emoji emoji-button">🇨🇼</div>
          <div className="emoji emoji-button">🇨🇾</div>
          <div className="emoji emoji-button">🇨🇿</div>
          <div className="emoji emoji-button">🇩🇰</div>
          <div className="emoji emoji-button">🇩🇯</div>
          <div className="emoji emoji-button">🇩🇲</div>
          <div className="emoji emoji-button">🇩🇴</div>
          <div className="emoji emoji-button">🇪🇨</div>
          <div className="emoji emoji-button">🇪🇬</div>
          <div className="emoji emoji-button">🇸🇻</div>
          <div className="emoji emoji-button">🇬🇶</div>
          <div className="emoji emoji-button">🇪🇷</div>
          <div className="emoji emoji-button">🇪🇪</div>
          <div className="emoji emoji-button">🇪🇹</div>
          <div className="emoji emoji-button">🇪🇺</div>
          <div className="emoji emoji-button">🇫🇰</div>
          <div className="emoji emoji-button">🇫🇴</div>
          <div className="emoji emoji-button">🇫🇯</div>
          <div className="emoji emoji-button">🇫🇮</div>
          <div className="emoji emoji-button">🇫🇷</div>
          <div className="emoji emoji-button">🇬🇫</div>
          <div className="emoji emoji-button">🇵🇫</div>
          <div className="emoji emoji-button">🇹🇫</div>
          <div className="emoji emoji-button">🇬🇦</div>
          <div className="emoji emoji-button">🇬🇲</div>
          <div className="emoji emoji-button">🇬🇪</div>
          <div className="emoji emoji-button">🇩🇪</div>
          <div className="emoji emoji-button">🇬🇭</div>
          <div className="emoji emoji-button">🇬🇮</div>
          <div className="emoji emoji-button">🇬🇷</div>
          <div className="emoji emoji-button">🇬🇱</div>
          <div className="emoji emoji-button">🇬🇩</div>
          <div className="emoji emoji-button">🇬🇵</div>
          <div className="emoji emoji-button">🇬🇺</div>
          <div className="emoji emoji-button">🇬🇹</div>
          <div className="emoji emoji-button">🇬🇬</div>
          <div className="emoji emoji-button">🇬🇳</div>
          <div className="emoji emoji-button">🇬🇼</div>
          <div className="emoji emoji-button">🇬🇾</div>
          <div className="emoji emoji-button">🇭🇹</div>
          <div className="emoji emoji-button">🇭🇳</div>
          <div className="emoji emoji-button">🇭🇰</div>
          <div className="emoji emoji-button">🇭🇺</div>
          <div className="emoji emoji-button">🇮🇸</div>
          <div className="emoji emoji-button">🇮🇳</div>
          <div className="emoji emoji-button">🇮🇩</div>
          <div className="emoji emoji-button">🇮🇷</div>
          <div className="emoji emoji-button">🇮🇶</div>
          <div className="emoji emoji-button">🇮🇪</div>
          <div className="emoji emoji-button">🇮🇲</div>
          <div className="emoji emoji-button">🇮🇱</div>
          <div className="emoji emoji-button">🇮🇹</div>
          <div className="emoji emoji-button">🇯🇲</div>
          <div className="emoji emoji-button">🇯🇵</div>
          <div className="emoji emoji-button">🎌</div>
          <div className="emoji emoji-button">🇯🇪</div>
          <div className="emoji emoji-button">🇯🇴</div>
          <div className="emoji emoji-button">🇰🇿</div>
          <div className="emoji emoji-button">🇰🇪</div>
          <div className="emoji emoji-button">🇰🇮</div>
          <div className="emoji emoji-button">🇽🇰</div>
          <div className="emoji emoji-button">🇰🇼</div>
          <div className="emoji emoji-button">🇰🇬</div>
          <div className="emoji emoji-button">🇱🇦</div>
          <div className="emoji emoji-button">🇱🇻</div>
          <div className="emoji emoji-button">🇱🇧</div>
          <div className="emoji emoji-button">🇱🇸</div>
          <div className="emoji emoji-button">🇱🇷</div>
          <div className="emoji emoji-button">🇱🇾</div>
          <div className="emoji emoji-button">🇱🇮</div>
          <div className="emoji emoji-button">🇱🇹</div>
          <div className="emoji emoji-button">🇱🇺</div>
          <div className="emoji emoji-button">🇲🇴</div>
          <div className="emoji emoji-button">🇲🇰</div>
          <div className="emoji emoji-button">🇲🇬</div>
          <div className="emoji emoji-button">🇲🇼</div>
          <div className="emoji emoji-button">🇲🇾</div>
          <div className="emoji emoji-button">🇲🇻</div>
          <div className="emoji emoji-button">🇲🇱</div>
          <div className="emoji emoji-button">🇲🇹</div>
          <div className="emoji emoji-button">🇲🇭</div>
          <div className="emoji emoji-button">🇲🇶</div>
          <div className="emoji emoji-button">🇲🇷</div>
          <div className="emoji emoji-button">🇲🇺</div>
          <div className="emoji emoji-button">🇾🇹</div>
          <div className="emoji emoji-button">🇲🇽</div>
          <div className="emoji emoji-button">🇫🇲</div>
          <div className="emoji emoji-button">🇲🇩</div>
          <div className="emoji emoji-button">🇲🇨</div>
          <div className="emoji emoji-button">🇲🇳</div>
          <div className="emoji emoji-button">🇲🇪</div>
          <div className="emoji emoji-button">🇲🇸</div>
          <div className="emoji emoji-button">🇲🇦</div>
          <div className="emoji emoji-button">🇲🇿</div>
          <div className="emoji emoji-button">🇲🇲</div>
          <div className="emoji emoji-button">🇳🇦</div>
          <div className="emoji emoji-button">🇳🇷</div>
          <div className="emoji emoji-button">🇳🇵</div>
          <div className="emoji emoji-button">🇳🇱</div>
          <div className="emoji emoji-button">🇳🇨</div>
          <div className="emoji emoji-button">🇳🇿</div>
          <div className="emoji emoji-button">🇳🇮</div>
          <div className="emoji emoji-button">🇳🇪</div>
          <div className="emoji emoji-button">🇳🇬</div>
          <div className="emoji emoji-button">🇳🇺</div>
          <div className="emoji emoji-button">🇳🇫</div>
          <div className="emoji emoji-button">🇰🇵</div>
          <div className="emoji emoji-button">🇲🇵</div>
          <div className="emoji emoji-button">🇳🇴</div>
          <div className="emoji emoji-button">🇴🇲</div>
          <div className="emoji emoji-button">🇵🇰</div>
          <div className="emoji emoji-button">🇵🇼</div>
          <div className="emoji emoji-button">🇵🇸</div>
          <div className="emoji emoji-button">🇵🇦</div>
          <div className="emoji emoji-button">🇵🇬</div>
          <div className="emoji emoji-button">🇵🇾</div>
          <div className="emoji emoji-button">🇵🇪</div>
          <div className="emoji emoji-button">🇵🇭</div>
          <div className="emoji emoji-button">🇵🇳</div>
          <div className="emoji emoji-button">🇵🇱</div>
          <div className="emoji emoji-button">🇵🇹</div>
          <div className="emoji emoji-button">🇵🇷</div>
          <div className="emoji emoji-button">🇶🇦</div>
          <div className="emoji emoji-button">🇷🇪</div>
          <div className="emoji emoji-button">🇷🇴</div>
          <div className="emoji emoji-button">🇷🇺</div>
          <div className="emoji emoji-button">🇷🇼</div>
          <div className="emoji emoji-button">🇼🇸</div>
          <div className="emoji emoji-button">🇸🇲</div>
          <div className="emoji emoji-button">🇸🇦</div>
          <div className="emoji emoji-button">🇸🇳</div>
          <div className="emoji emoji-button">🇷🇸</div>
          <div className="emoji emoji-button">🇸🇨</div>
          <div className="emoji emoji-button">🇸🇱</div>
          <div className="emoji emoji-button">🇸🇬</div>
          <div className="emoji emoji-button">🇸🇽</div>
          <div className="emoji emoji-button">🇸🇰</div>
          <div className="emoji emoji-button">🇸🇮</div>
          <div className="emoji emoji-button">🇬🇸</div>
          <div className="emoji emoji-button">🇸🇧</div>
          <div className="emoji emoji-button">🇸🇴</div>
          <div className="emoji emoji-button">🇿🇦</div>
          <div className="emoji emoji-button">🇰🇷</div>
          <div className="emoji emoji-button">🇸🇸</div>
          <div className="emoji emoji-button">🇪🇸</div>
          <div className="emoji emoji-button">🇱🇰</div>
          <div className="emoji emoji-button">🇧🇱</div>
          <div className="emoji emoji-button">🇸🇭</div>
          <div className="emoji emoji-button">🇰🇳</div>
          <div className="emoji emoji-button">🇱🇨</div>
          <div className="emoji emoji-button">🇵🇲</div>
          <div className="emoji emoji-button">🇻🇨</div>
          <div className="emoji emoji-button">🇸🇩</div>
          <div className="emoji emoji-button">🇸🇷</div>
          <div className="emoji emoji-button">🇸🇿</div>
          <div className="emoji emoji-button">🇸🇪</div>
          <div className="emoji emoji-button">🇨🇭</div>
          <div className="emoji emoji-button">🇸🇾</div>
          <div className="emoji emoji-button">🇹🇼</div>
          <div className="emoji emoji-button">🇹🇯</div>
          <div className="emoji emoji-button">🇹🇿</div>
          <div className="emoji emoji-button">🇹🇭</div>
          <div className="emoji emoji-button">🇹🇱</div>
          <div className="emoji emoji-button">🇹🇬</div>
          <div className="emoji emoji-button">🇹🇰</div>
          <div className="emoji emoji-button">🇹🇴</div>
          <div className="emoji emoji-button">🇹🇹</div>
          <div className="emoji emoji-button">🇹🇳</div>
          <div className="emoji emoji-button">🇹🇷</div>
          <div className="emoji emoji-button">🇹🇲</div>
          <div className="emoji emoji-button">🇹🇨</div>
          <div className="emoji emoji-button">🇹🇻</div>
          <div className="emoji emoji-button">🇻🇮</div>
          <div className="emoji emoji-button">🇺🇬</div>
          <div className="emoji emoji-button">🇺🇦</div>
          <div className="emoji emoji-button">🇦🇪</div>
          <div className="emoji emoji-button">🇬🇧</div>
          <div className="emoji emoji-button">🏴</div>
          <div className="emoji emoji-button">🏴</div>
          <div className="emoji emoji-button">🏴</div>
          <div className="emoji emoji-button">🇺🇳</div>
          <div className="emoji emoji-button">🇺🇸</div>
          <div className="emoji emoji-button">🇺🇾</div>
          <div className="emoji emoji-button">🇺🇿</div>
          <div className="emoji emoji-button">🇻🇺</div>
          <div className="emoji emoji-button">🇻🇦</div>
          <div className="emoji emoji-button">🇻🇪</div>
          <div className="emoji emoji-button">🇻🇳</div>
          <div className="emoji emoji-button">🇼🇫</div>
          <div className="emoji emoji-button">🇪🇭</div>
          <div className="emoji emoji-button">🇾🇪</div>
          <div className="emoji emoji-button">🇿🇲</div>
          <div className="emoji emoji-button">🇿🇼</div>
        </div>
      </section>
      <div className="flex flex-wrap w-full">
        <a href="#smileys">😃💁 People</a
        ><a href="#animals-nature"
          ><span
            className="text-black inline-flex flex-shrink-0 w-4 items-center justify-center"
            >•</span
          >🐻🌻 Animals</a
        ><a href="#food-drink"
          ><span
            className="text-black inline-flex flex-shrink-0 w-4 items-center justify-center"
            >•</span
          >🍔🍹 Food</a
        ><a href="#activities"
          ><span
            className="text-black inline-flex flex-shrink-0 w-4 items-center justify-center"
            >•</span
          >🎷⚽️ Activities</a
        ><a href="#travel-places"
          ><span
            className="text-black inline-flex flex-shrink-0 w-4 items-center justify-center"
            >•</span
          >🚘🌇 Travel</a
        ><a href="#objects"
          ><span
            className="text-black inline-flex flex-shrink-0 w-4 items-center justify-center"
            >•</span
          >💡🎉 Objects</a
        ><a href="#symbols"
          ><span
            className="text-black inline-flex flex-shrink-0 w-4 items-center justify-center"
            >•</span
          >💖🔣 Symbols</a
        ><a href="#flags"
          ><span
            className="text-black inline-flex flex-shrink-0 w-4 items-center justify-center"
            >•</span
          >🎌🏳️‍🌈 Flags</a
        >
      </div>
      <section className="flex flex-col w-auto gap-4 mx-auto md:mx-0">
        <h2>
          <a
            title="New 2022 Emojis"
            href="https://emojipedia.org/new"
            target="_blank"
            >New Emojis</a
          >
        </h2>
        <form
          className="w-full flex overflow-hidden"
          role="search"
          action="https://emojipedia.org/search"
          method="get"
        >
          <input
            type="text"
            className="w-full h-10 p-4 border border-grey/10 rounded-tl-md rounded-bl-md focus:outline-blue/20"
            placeholder="Find emojis by name or description"
            id="srch-term"
            name="q"
          /><button
            type="submit"
            className="w-10 flex items-center justify-center border border-grey/10 rounded-tr-md rounded-br-md border-l-0 hover:bg-grey/10"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_1337_1457)">
                <path
                  d="M13.9043 12.8215L10.5848 9.50195C10.5219 9.43906 10.4398 9.40625 10.3523 9.40625H9.99141C10.8527 8.4082 11.375 7.10938 11.375 5.6875C11.375 2.5457 8.8293 0 5.6875 0C2.5457 0 0 2.5457 0 5.6875C0 8.8293 2.5457 11.375 5.6875 11.375C7.10938 11.375 8.4082 10.8527 9.40625 9.99141V10.3523C9.40625 10.4398 9.4418 10.5219 9.50195 10.5848L12.8215 13.9043C12.95 14.0328 13.1578 14.0328 13.2863 13.9043L13.9043 13.2863C14.0328 13.1578 14.0328 12.95 13.9043 12.8215ZM5.6875 10.0625C3.27031 10.0625 1.3125 8.10469 1.3125 5.6875C1.3125 3.27031 3.27031 1.3125 5.6875 1.3125C8.10469 1.3125 10.0625 3.27031 10.0625 5.6875C10.0625 8.10469 8.10469 10.0625 5.6875 10.0625Z"
                  fill="#111111"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0_1337_1457">
                  <rect width="14" height="14" fill="white"></rect>
                </clipPath>
              </defs>
            </svg>
          </button>
        </form>
        <div className="flex flex-wrap"></div>
        <div className="flex flex-col w-full gap-5 pb-10">
          <div className="w-full">
            Emojis from
            <a href="https://emojipedia.org/emoji-17.0" title="New 2025 Emojis"
              >Emoji 17.0</a
            >: Added in 2025.
          </div>
                  <button id="copy-all-emojis-2" type="button" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={copyAllEmojis}>
            Copy All Emojis
          </button>
          <div className="flex flex-wrap">
            <div className="emoji emoji-button">🫪</div>
            <div className="emoji emoji-button">🫯</div>
            <div className="emoji emoji-button">🫈</div>
            <div className="emoji emoji-button">🫍</div>
            <div className="emoji emoji-button">🛘</div>
            <div className="emoji emoji-button">🪊</div>
            <div className="emoji emoji-button">🪎</div>
            <div className="emoji emoji-button">🧑‍🩰</div>
            <div className="emoji emoji-button">🧑🏻‍🩰</div>
            <div className="emoji emoji-button">🧑🏼‍🩰</div>
            <div className="emoji emoji-button">🧑🏽‍🩰</div>
            <div className="emoji emoji-button">🧑🏾‍🩰</div>
            <div className="emoji emoji-button">🧑🏿‍🩰</div>
            <div className="emoji emoji-button">👯🏻</div>
            <div className="emoji emoji-button">👯🏼</div>
            <div className="emoji emoji-button">👯🏽</div>
            <div className="emoji emoji-button">👯🏾</div>
            <div className="emoji emoji-button">👯🏿</div>
            <div className="emoji emoji-button">👯🏻‍♂️</div>
            <div className="emoji emoji-button">👯🏼‍♂️</div>
            <div className="emoji emoji-button">👯🏽‍♂️</div>
            <div className="emoji emoji-button">👯🏾‍♂️</div>
            <div className="emoji emoji-button">👯🏿‍♂️</div>
            <div className="emoji emoji-button">👯🏻‍♀️</div>
            <div className="emoji emoji-button">👯🏼‍♀️</div>
            <div className="emoji emoji-button">👯🏽‍♀️</div>
            <div className="emoji emoji-button">👯🏾‍♀️</div>
            <div className="emoji emoji-button">👯🏿‍♀️</div>
            <div className="emoji emoji-button">🧑🏻‍🐰‍🧑🏼</div>
            <div className="emoji emoji-button">🧑🏻‍🐰‍🧑🏽</div>
            <div className="emoji emoji-button">🧑🏻‍🐰‍🧑🏾</div>
            <div className="emoji emoji-button">🧑🏻‍🐰‍🧑🏿</div>
            <div className="emoji emoji-button">🧑🏼‍🐰‍🧑🏻</div>
            <div className="emoji emoji-button">🧑🏼‍🐰‍🧑🏽</div>
            <div className="emoji emoji-button">🧑🏼‍🐰‍🧑🏾</div>
            <div className="emoji emoji-button">🧑🏼‍🐰‍🧑🏿</div>
            <div className="emoji emoji-button">🧑🏽‍🐰‍🧑🏻</div>
            <div className="emoji emoji-button">🧑🏽‍🐰‍🧑🏼</div>
            <div className="emoji emoji-button">🧑🏽‍🐰‍🧑🏾</div>
            <div className="emoji emoji-button">🧑🏽‍🐰‍🧑🏿</div>
            <div className="emoji emoji-button">🧑🏾‍🐰‍🧑🏻</div>
            <div className="emoji emoji-button">🧑🏾‍🐰‍🧑🏼</div>
            <div className="emoji emoji-button">🧑🏾‍🐰‍🧑🏽</div>
            <div className="emoji emoji-button">🧑🏾‍🐰‍🧑🏿</div>
            <div className="emoji emoji-button">🧑🏿‍🐰‍🧑🏻</div>
            <div className="emoji emoji-button">🧑🏿‍🐰‍🧑🏼</div>
            <div className="emoji emoji-button">🧑🏿‍🐰‍🧑🏽</div>
            <div className="emoji emoji-button">🧑🏿‍🐰‍🧑🏾</div>
            <div className="emoji emoji-button">👨🏻‍🐰‍👨🏼</div>
            <div className="emoji emoji-button">👨🏻‍🐰‍👨🏽</div>
            <div className="emoji emoji-button">👨🏻‍🐰‍👨🏾</div>
            <div className="emoji emoji-button">👨🏻‍🐰‍👨🏿</div>
            <div className="emoji emoji-button">👨🏼‍🐰‍👨🏻</div>
            <div className="emoji emoji-button">👨🏼‍🐰‍👨🏽</div>
            <div className="emoji emoji-button">👨🏼‍🐰‍👨🏾</div>
            <div className="emoji emoji-button">👨🏼‍🐰‍👨🏿</div>
            <div className="emoji emoji-button">👨🏽‍🐰‍👨🏻</div>
            <div className="emoji emoji-button">👨🏽‍🐰‍👨🏼</div>
            <div className="emoji emoji-button">👨🏽‍🐰‍👨🏾</div>
            <div className="emoji emoji-button">👨🏽‍🐰‍👨🏿</div>
            <div className="emoji emoji-button">👨🏾‍🐰‍👨🏻</div>
            <div className="emoji emoji-button">👨🏾‍🐰‍👨🏼</div>
            <div className="emoji emoji-button">👨🏾‍🐰‍👨🏽</div>
            <div className="emoji emoji-button">👨🏾‍🐰‍👨🏿</div>
            <div className="emoji emoji-button">👨🏿‍🐰‍👨🏻</div>
            <div className="emoji emoji-button">👨🏿‍🐰‍👨🏼</div>
            <div className="emoji emoji-button">👨🏿‍🐰‍👨🏽</div>
            <div className="emoji emoji-button">👨🏿‍🐰‍👨🏾</div>
            <div className="emoji emoji-button">👩🏻‍🐰‍👩🏼</div>
            <div className="emoji emoji-button">👩🏻‍🐰‍👩🏽</div>
            <div className="emoji emoji-button">👩🏻‍🐰‍👩🏾</div>
            <div className="emoji emoji-button">👩🏻‍🐰‍👩🏿</div>
            <div className="emoji emoji-button">👩🏼‍🐰‍👩🏻</div>
            <div className="emoji emoji-button">👩🏼‍🐰‍👩🏽</div>
            <div className="emoji emoji-button">👩🏼‍🐰‍👩🏾</div>
            <div className="emoji emoji-button">👩🏼‍🐰‍👩🏿</div>
            <div className="emoji emoji-button">👩🏽‍🐰‍👩🏻</div>
            <div className="emoji emoji-button">👩🏽‍🐰‍👩🏼</div>
            <div className="emoji emoji-button">👩🏽‍🐰‍👩🏾</div>
            <div className="emoji emoji-button">👩🏽‍🐰‍👩🏿</div>
            <div className="emoji emoji-button">👩🏾‍🐰‍👩🏻</div>
            <div className="emoji emoji-button">👩🏾‍🐰‍👩🏼</div>
            <div className="emoji emoji-button">👩🏾‍🐰‍👩🏽</div>
            <div className="emoji emoji-button">👩🏾‍🐰‍👩🏿</div>
            <div className="emoji emoji-button">👩🏿‍🐰‍👩🏻</div>
            <div className="emoji emoji-button">👩🏿‍🐰‍👩🏼</div>
            <div className="emoji emoji-button">👩🏿‍🐰‍👩🏽</div>
            <div className="emoji emoji-button">👩🏿‍🐰‍👩🏾</div>
            <div className="emoji emoji-button">🤼🏻</div>
            <div className="emoji emoji-button">🤼🏼</div>
            <div className="emoji emoji-button">🤼🏽</div>
            <div className="emoji emoji-button">🤼🏾</div>
            <div className="emoji emoji-button">🤼🏿</div>
            <div className="emoji emoji-button">🤼🏻‍♂️</div>
            <div className="emoji emoji-button">🤼🏼‍♂️</div>
            <div className="emoji emoji-button">🤼🏽‍♂️</div>
            <div className="emoji emoji-button">🤼🏾‍♂️</div>
            <div className="emoji emoji-button">🤼🏿‍♂️</div>
            <div className="emoji emoji-button">🤼🏻‍♀️</div>
            <div className="emoji emoji-button">🤼🏼‍♀️</div>
            <div className="emoji emoji-button">🤼🏽‍♀️</div>
            <div className="emoji emoji-button">🤼🏾‍♀️</div>
            <div className="emoji emoji-button">🤼🏿‍♀️</div>
            <div className="emoji emoji-button">🧑🏻‍🫯‍🧑🏼</div>
            <div className="emoji emoji-button">🧑🏻‍🫯‍🧑🏽</div>
            <div className="emoji emoji-button">🧑🏻‍🫯‍🧑🏾</div>
            <div className="emoji emoji-button">🧑🏻‍🫯‍🧑🏿</div>
            <div className="emoji emoji-button">🧑🏼‍🫯‍🧑🏻</div>
            <div className="emoji emoji-button">🧑🏼‍🫯‍🧑🏽</div>
            <div className="emoji emoji-button">🧑🏼‍🫯‍🧑🏾</div>
            <div className="emoji emoji-button">🧑🏼‍🫯‍🧑🏿</div>
            <div className="emoji emoji-button">🧑🏽‍🫯‍🧑🏻</div>
            <div className="emoji emoji-button">🧑🏽‍🫯‍🧑🏼</div>
            <div className="emoji emoji-button">🧑🏽‍🫯‍🧑🏾</div>
            <div className="emoji emoji-button">🧑🏽‍🫯‍🧑🏿</div>
            <div className="emoji emoji-button">🧑🏾‍🫯‍🧑🏻</div>
            <div className="emoji emoji-button">🧑🏾‍🫯‍🧑🏼</div>
            <div className="emoji emoji-button">🧑🏾‍🫯‍🧑🏽</div>
            <div className="emoji emoji-button">🧑🏾‍🫯‍🧑🏿</div>
            <div className="emoji emoji-button">🧑🏿‍🫯‍🧑🏻</div>
            <div className="emoji emoji-button">🧑🏿‍🫯‍🧑🏼</div>
            <div className="emoji emoji-button">🧑🏿‍🫯‍🧑🏽</div>
            <div className="emoji emoji-button">🧑🏿‍🫯‍🧑🏾</div>
            <div className="emoji emoji-button">👨🏻‍🫯‍👨🏼</div>
            <div className="emoji emoji-button">👨🏻‍🫯‍👨🏽</div>
            <div className="emoji emoji-button">👨🏻‍🫯‍👨🏾</div>
            <div className="emoji emoji-button">👨🏻‍🫯‍👨🏿</div>
            <div className="emoji emoji-button">👨🏼‍🫯‍👨🏻</div>
            <div className="emoji emoji-button">👨🏼‍🫯‍👨🏽</div>
            <div className="emoji emoji-button">👨🏼‍🫯‍👨🏾</div>
            <div className="emoji emoji-button">👨🏼‍🫯‍👨🏿</div>
            <div className="emoji emoji-button">👨🏽‍🫯‍👨🏻</div>
            <div className="emoji emoji-button">👨🏽‍🫯‍👨🏼</div>
            <div className="emoji emoji-button">👨🏽‍🫯‍👨🏾</div>
            <div className="emoji emoji-button">👨🏽‍🫯‍👨🏿</div>
            <div className="emoji emoji-button">👨🏾‍🫯‍👨🏻</div>
            <div className="emoji emoji-button">👨🏾‍🫯‍👨🏼</div>
            <div className="emoji emoji-button">👨🏾‍🫯‍👨🏽</div>
            <div className="emoji emoji-button">👨🏾‍🫯‍👨🏿</div>
            <div className="emoji emoji-button">👨🏿‍🫯‍👨🏻</div>
            <div className="emoji emoji-button">👨🏿‍🫯‍👨🏼</div>
            <div className="emoji emoji-button">👨🏿‍🫯‍👨🏽</div>
            <div className="emoji emoji-button">👨🏿‍🫯‍👨🏾</div>
            <div className="emoji emoji-button">👩🏻‍🫯‍👩🏼</div>
            <div className="emoji emoji-button">👩🏻‍🫯‍👩🏽</div>
            <div className="emoji emoji-button">👩🏻‍🫯‍👩🏾</div>
            <div className="emoji emoji-button">👩🏻‍🫯‍👩🏿</div>
            <div className="emoji emoji-button">👩🏼‍🫯‍👩🏻</div>
            <div className="emoji emoji-button">👩🏼‍🫯‍👩🏽</div>
            <div className="emoji emoji-button">👩🏼‍🫯‍👩🏾</div>
            <div className="emoji emoji-button">👩🏼‍🫯‍👩🏿</div>
            <div className="emoji emoji-button">👩🏽‍🫯‍👩🏻</div>
            <div className="emoji emoji-button">👩🏽‍🫯‍👩🏼</div>
            <div className="emoji emoji-button">👩🏽‍🫯‍👩🏾</div>
            <div className="emoji emoji-button">👩🏽‍🫯‍👩🏿</div>
            <div className="emoji emoji-button">👩🏾‍🫯‍👩🏻</div>
            <div className="emoji emoji-button">👩🏾‍🫯‍👩🏼</div>
            <div className="emoji emoji-button">👩🏾‍🫯‍👩🏽</div>
            <div className="emoji emoji-button">👩🏾‍🫯‍👩🏿</div>
            <div className="emoji emoji-button">👩🏿‍🫯‍👩🏻</div>
            <div className="emoji emoji-button">👩🏿‍🫯‍👩🏼</div>
            <div className="emoji emoji-button">👩🏿‍🫯‍👩🏽</div>
            <div className="emoji emoji-button">👩🏿‍🫯‍👩🏾</div>
          </div>
        </div>
        <div className="flex flex-col w-full gap-5 pb-10">
          <div className="w-full">
            Emojis from
            <a href="https://emojipedia.org/emoji-16.0" title="New 2024 Emojis"
              >Emoji 16.0</a
            >: Added in 2024.
          </div>
                  <button id="copy-all-emojis-3" type="button" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={copyAllEmojis}>
            Copy All Emojis
          </button>
          <div className="flex flex-wrap">
            <div className="emoji emoji-button">🫩</div>
            <div className="emoji emoji-button">🫆</div>
            <div className="emoji emoji-button">🪾</div>
            <div className="emoji emoji-button">🫜</div>
            <div className="emoji emoji-button">🪉</div>
            <div className="emoji emoji-button">🪏</div>
            <div className="emoji emoji-button">🫟</div>
            <div className="emoji emoji-button">🇨🇶</div>
          </div>
        </div>
        <div className="flex flex-col w-full gap-5 pb-10">
          <div className="w-full">
            Emojis from
            <a href="https://emojipedia.org/emoji-15.1" title="New 2023 Emojis"
              >Emoji 15.1</a
            >: Added in 2023.
          </div>
                  <button id="copy-all-emojis-4" type="button" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={copyAllEmojis}>
            Copy All Emojis
          </button>
          <div className="flex flex-wrap">
            <div className="emoji emoji-button">🙂‍↔️</div>
            <div className="emoji emoji-button">🙂‍↕️</div>
            <div className="emoji emoji-button">🚶‍➡️</div>
            <div className="emoji emoji-button">🚶🏻‍➡️</div>
            <div className="emoji emoji-button">🚶🏼‍➡️</div>
            <div className="emoji emoji-button">🚶🏽‍➡️</div>
            <div className="emoji emoji-button">🚶🏾‍➡️</div>
            <div className="emoji emoji-button">🚶🏿‍➡️</div>
            <div className="emoji emoji-button">🚶‍➡️</div>
            <div className="emoji emoji-button">🚶🏻‍➡️</div>
            <div className="emoji emoji-button">🚶🏼‍➡️</div>
            <div className="emoji emoji-button">🚶🏽‍➡️</div>
            <div className="emoji emoji-button">🚶🏾‍➡️</div>
            <div className="emoji emoji-button">🚶🏿‍➡️</div>
            <div className="emoji emoji-button">🚶‍♀️‍➡️</div>
            <div className="emoji emoji-button">🚶🏻‍♀️‍➡️</div>
            <div className="emoji emoji-button">🚶🏼‍♀️‍➡️</div>
            <div className="emoji emoji-button">🚶🏽‍♀️‍➡️</div>
            <div className="emoji emoji-button">🚶🏾‍♀️‍➡️</div>
            <div className="emoji emoji-button">🚶🏿‍♀️‍➡️</div>
            <div className="emoji emoji-button">🚶‍♂️‍➡️</div>
            <div className="emoji emoji-button">🚶🏻‍♂️‍➡️</div>
            <div className="emoji emoji-button">🚶🏼‍♂️‍➡️</div>
            <div className="emoji emoji-button">🚶🏽‍♂️‍➡️</div>
            <div className="emoji emoji-button">🚶🏾‍♂️‍➡️</div>
            <div className="emoji emoji-button">🚶🏿‍♂️‍➡️</div>
            <div className="emoji emoji-button">🧎‍➡️</div>
            <div className="emoji emoji-button">🧎🏻‍➡️</div>
            <div className="emoji emoji-button">🧎🏼‍➡️</div>
            <div className="emoji emoji-button">🧎🏽‍➡️</div>
            <div className="emoji emoji-button">🧎🏾‍➡️</div>
            <div className="emoji emoji-button">🧎🏿‍➡️</div>
            <div className="emoji emoji-button">🧎‍♀️‍➡️</div>
            <div className="emoji emoji-button">🧎🏻‍♀️‍➡️</div>
            <div className="emoji emoji-button">🧎🏼‍♀️‍➡️</div>
            <div className="emoji emoji-button">🧎🏽‍♀️‍➡️</div>
            <div className="emoji emoji-button">🧎🏾‍♀️‍➡️</div>
            <div className="emoji emoji-button">🧎🏿‍♀️‍➡️</div>
            <div className="emoji emoji-button">🧎‍♂️‍➡️</div>
            <div className="emoji emoji-button">🧎🏻‍♂️‍➡️</div>
            <div className="emoji emoji-button">🧎🏼‍♂️‍➡️</div>
            <div className="emoji emoji-button">🧎🏽‍♂️‍➡️</div>
            <div className="emoji emoji-button">🧎🏾‍♂️‍➡️</div>
            <div className="emoji emoji-button">🧎🏿‍♂️‍➡️</div>
            <div className="emoji emoji-button">🧑‍🦯‍➡️</div>
            <div className="emoji emoji-button">🧑🏻‍🦯‍➡️</div>
            <div className="emoji emoji-button">🧑🏼‍🦯‍➡️</div>
            <div className="emoji emoji-button">🧑🏽‍🦯‍➡️</div>
            <div className="emoji emoji-button">🧑🏾‍🦯‍➡️</div>
            <div className="emoji emoji-button">🧑🏿‍🦯‍➡️</div>
            <div className="emoji emoji-button">👨‍🦯‍➡️</div>
            <div className="emoji emoji-button">👨🏻‍🦯‍➡️</div>
            <div className="emoji emoji-button">👨🏼‍🦯‍➡️</div>
            <div className="emoji emoji-button">👨🏽‍🦯‍➡️</div>
            <div className="emoji emoji-button">👨🏾‍🦯‍➡️</div>
            <div className="emoji emoji-button">👨🏿‍🦯‍➡️</div>
            <div className="emoji emoji-button">👩‍🦯‍➡️</div>
            <div className="emoji emoji-button">👩🏻‍🦯‍➡️</div>
            <div className="emoji emoji-button">👩🏼‍🦯‍➡️</div>
            <div className="emoji emoji-button">👩🏽‍🦯‍➡️</div>
            <div className="emoji emoji-button">👩🏾‍🦯‍➡️</div>
            <div className="emoji emoji-button">👩🏿‍🦯‍➡️</div>
            <div className="emoji emoji-button">🧑‍🦼‍➡️</div>
            <div className="emoji emoji-button">🧑🏻‍🦼‍➡️</div>
            <div className="emoji emoji-button">🧑🏼‍🦼‍➡️</div>
            <div className="emoji emoji-button">🧑🏽‍🦼‍➡️</div>
            <div className="emoji emoji-button">🧑🏾‍🦼‍➡️</div>
            <div className="emoji emoji-button">🧑🏿‍🦼‍➡️</div>
            <div className="emoji emoji-button">👨‍🦼‍➡️</div>
            <div className="emoji emoji-button">👨🏻‍🦼‍➡️</div>
            <div className="emoji emoji-button">👨🏼‍🦼‍➡️</div>
            <div className="emoji emoji-button">👨🏽‍🦼‍➡️</div>
            <div className="emoji emoji-button">👨🏾‍🦼‍➡️</div>
            <div className="emoji emoji-button">👨🏿‍🦼‍➡️</div>
            <div className="emoji emoji-button">👩‍🦼‍➡️</div>
            <div className="emoji emoji-button">👩🏻‍🦼‍➡️</div>
            <div className="emoji emoji-button">👩🏼‍🦼‍➡️</div>
            <div className="emoji emoji-button">👩🏽‍🦼‍➡️</div>
            <div className="emoji emoji-button">👩🏾‍🦼‍➡️</div>
            <div className="emoji emoji-button">🧑‍🦽‍➡️</div>
            <div className="emoji emoji-button">🧑🏻‍🦽‍➡️</div>
            <div className="emoji emoji-button">🧑🏼‍🦽‍➡️</div>
            <div className="emoji emoji-button">🧑🏽‍🦽‍➡️</div>
            <div className="emoji emoji-button">🧑🏾‍🦽‍➡️</div>
            <div className="emoji emoji-button">🧑🏿‍🦽‍➡️</div>
            <div className="emoji emoji-button">👨‍🦽‍➡️</div>
            <div className="emoji emoji-button">👨🏻‍🦽‍➡️</div>
            <div className="emoji emoji-button">👨🏼‍🦽‍➡️</div>
            <div className="emoji emoji-button">👨🏽‍🦽‍➡️</div>
            <div className="emoji emoji-button">👨🏾‍🦽‍➡️</div>
            <div className="emoji emoji-button">👨🏿‍🦽‍➡️</div>
            <div className="emoji emoji-button">👩‍🦽‍➡️</div>
            <div className="emoji emoji-button">👩🏻‍🦽‍➡️</div>
            <div className="emoji emoji-button">👩🏼‍🦽‍➡️</div>
            <div className="emoji emoji-button">👩🏽‍🦽‍➡️</div>
            <div className="emoji emoji-button">👩🏾‍🦽‍➡️</div>
            <div className="emoji emoji-button">👩🏿‍🦽‍➡️</div>
            <div className="emoji emoji-button">🏃‍➡️</div>
            <div className="emoji emoji-button">🏃🏻‍➡️</div>
            <div className="emoji emoji-button">🏃🏼‍➡️</div>
            <div className="emoji emoji-button">🏃🏽‍➡️</div>
            <div className="emoji emoji-button">🏃🏾‍➡️</div>
            <div className="emoji emoji-button">🏃🏿‍➡️</div>
            <div className="emoji emoji-button">🏃‍♀️‍➡️</div>
            <div className="emoji emoji-button">🏃🏻‍♀️‍➡️</div>
            <div className="emoji emoji-button">🏃🏼‍♀️‍➡️</div>
            <div className="emoji emoji-button">🏃🏽‍♀️‍➡️</div>
            <div className="emoji emoji-button">🏃🏾‍♀️‍➡️</div>
            <div className="emoji emoji-button">🏃🏿‍♀️‍➡️</div>
            <div className="emoji emoji-button">🏃‍♂️‍➡️</div>
            <div className="emoji emoji-button">🏃🏻‍♂️‍➡️</div>
            <div className="emoji emoji-button">🏃🏼‍♂️‍➡️</div>
            <div className="emoji emoji-button">🏃🏽‍♂️‍➡️</div>
            <div className="emoji emoji-button">🏃🏾‍♂️‍➡️</div>
            <div className="emoji emoji-button">🏃🏿‍♂️‍➡️</div>
            <div className="emoji emoji-button">🧑‍🧑‍🧒</div>
            <div className="emoji emoji-button">🧑‍🧑‍🧒‍🧒</div>
            <div className="emoji emoji-button">🧑‍🧒</div>
            <div className="emoji emoji-button">🧑‍🧒‍🧒</div>
            <div className="emoji emoji-button">🐦‍🔥</div>
            <div className="emoji emoji-button">🍋‍🟩</div>
            <div className="emoji emoji-button">🍄‍🟫</div>
            <div className="emoji emoji-button">⛓️‍💥</div>
          </div>
        </div>
        <div className="flex flex-col w-full gap-5 pb-10">
          <div className="w-full">
            Emojis from
            <a href="https://emojipedia.org/emoji-15.0" title="New 2022 Emojis"
              >Emoji 15.0</a
            >: Added in 2022.
          </div>
                  <button id="copy-all-emojis-5" type="button" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={copyAllEmojis}>
            Copy All Emojis
          </button>
          <div className="flex flex-wrap">
            <div className="emoji emoji-button">🫨</div>
            <div className="emoji emoji-button">🩷</div>
            <div className="emoji emoji-button">🩵</div>
            <div className="emoji emoji-button">🩶</div>
            <div className="emoji emoji-button">🫸</div>
            <div className="emoji emoji-button">🫸🏻</div>
            <div className="emoji emoji-button">🫸🏼</div>
            <div className="emoji emoji-button">🫸🏽</div>
            <div className="emoji emoji-button">🫸🏾</div>
            <div className="emoji emoji-button">🫸🏿</div>
            <div className="emoji emoji-button">🫷</div>
            <div className="emoji emoji-button">🫷🏻</div>
            <div className="emoji emoji-button">🫷🏼</div>
            <div className="emoji emoji-button">🫷🏽</div>
            <div className="emoji emoji-button">🫷🏾</div>
            <div className="emoji emoji-button">🫷🏿</div>
            <div className="emoji emoji-button">🫏</div>
            <div className="emoji emoji-button">🫎</div>
            <div className="emoji emoji-button">🪿</div>
            <div className="emoji emoji-button">🐦‍⬛</div>
            <div className="emoji emoji-button">🪽</div>
            <div className="emoji emoji-button">🪼</div>
            <div className="emoji emoji-button">🪻</div>
            <div className="emoji emoji-button">🫛</div>
            <div className="emoji emoji-button">🫚</div>
            <div className="emoji emoji-button">🪭</div>
            <div className="emoji emoji-button">🪮</div>
            <div className="emoji emoji-button">🪈</div>
            <div className="emoji emoji-button">🪇</div>
            <div className="emoji emoji-button">🪯</div>
            <div className="emoji emoji-button">🛜</div>
          </div>
        </div>
        <div className="flex flex-col w-full gap-5 pb-10">
          <div className="w-full">
            Emojis from
            <a href="https://emojipedia.org/emoji-14.0" title="New 2021 Emojis"
              >Emoji 14.0</a
            >: Added in 2021.
          </div>
                  <button id="copy-all-emojis-6" type="button" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={copyAllEmojis}>
            Copy All Emojis
          </button>
          <div className="flex flex-wrap">
            <div className="emoji emoji-button">🫠</div>
            <div className="emoji emoji-button">🫢</div>
            <div className="emoji emoji-button">🫣</div>
            <div className="emoji emoji-button">🫡</div>
            <div className="emoji emoji-button">🫥</div>
            <div className="emoji emoji-button">🫤</div>
            <div className="emoji emoji-button">🥹</div>
            <div className="emoji emoji-button">🫱</div>
            <div className="emoji emoji-button">🫱🏻</div>
            <div className="emoji emoji-button">🫱🏼</div>
            <div className="emoji emoji-button">🫱🏽</div>
            <div className="emoji emoji-button">🫱🏾</div>
            <div className="emoji emoji-button">🫱🏿</div>
            <div className="emoji emoji-button">🫲</div>
            <div className="emoji emoji-button">🫲🏻</div>
            <div className="emoji emoji-button">🫲🏼</div>
            <div className="emoji emoji-button">🫲🏽</div>
            <div className="emoji emoji-button">🫲🏾</div>
            <div className="emoji emoji-button">🫲🏿</div>
            <div className="emoji emoji-button">🫳</div>
            <div className="emoji emoji-button">🫳🏻</div>
            <div className="emoji emoji-button">🫳🏼</div>
            <div className="emoji emoji-button">🫳🏽</div>
            <div className="emoji emoji-button">🫳🏾</div>
            <div className="emoji emoji-button">🫳🏿</div>
            <div className="emoji emoji-button">🫴</div>
            <div className="emoji emoji-button">🫴🏻</div>
            <div className="emoji emoji-button">🫴🏼</div>
            <div className="emoji emoji-button">🫴🏽</div>
            <div className="emoji emoji-button">🫴🏾</div>
            <div className="emoji emoji-button">🫴🏿</div>
            <div className="emoji emoji-button">🫰</div>
            <div className="emoji emoji-button">🫰🏻</div>
            <div className="emoji emoji-button">🫰🏼</div>
            <div className="emoji emoji-button">🫰🏽</div>
            <div className="emoji emoji-button">🫰🏾</div>
            <div className="emoji emoji-button">🫰🏿</div>
            <div className="emoji emoji-button">🫵</div>
            <div className="emoji emoji-button">🫵🏻</div>
            <div className="emoji emoji-button">🫵🏼</div>
            <div className="emoji emoji-button">🫵🏽</div>
            <div className="emoji emoji-button">🫵🏾</div>
            <div className="emoji emoji-button">🫵🏿</div>
            <div className="emoji emoji-button">🫶</div>
            <div className="emoji emoji-button">🫶🏻</div>
            <div className="emoji emoji-button">🫶🏼</div>
            <div className="emoji emoji-button">🫶🏽</div>
            <div className="emoji emoji-button">🫶🏾</div>
            <div className="emoji emoji-button">🫶🏿</div>
            <div className="emoji emoji-button">🤝🏻</div>
            <div className="emoji emoji-button">🤝🏼</div>
            <div className="emoji emoji-button">🤝🏽</div>
            <div className="emoji emoji-button">🤝🏾</div>
            <div className="emoji emoji-button">🤝🏿</div>
            <div className="emoji emoji-button">🫱🏻‍🫲🏼</div>
            <div className="emoji emoji-button">🫱🏻‍🫲🏽</div>
            <div className="emoji emoji-button">🫱🏻‍🫲🏾</div>
            <div className="emoji emoji-button">🫱🏻‍🫲🏿</div>
            <div className="emoji emoji-button">🫱🏼‍🫲🏻</div>
            <div className="emoji emoji-button">🫱🏼‍🫲🏽</div>
            <div className="emoji emoji-button">🫱🏼‍🫲🏾</div>
            <div className="emoji emoji-button">🫱🏼‍🫲🏿</div>
            <div className="emoji emoji-button">🫱🏽‍🫲🏻</div>
            <div className="emoji emoji-button">🫱🏽‍🫲🏼</div>
            <div className="emoji emoji-button">🫱🏽‍🫲🏾</div>
            <div className="emoji emoji-button">🫱🏽‍🫲🏿</div>
            <div className="emoji emoji-button">🫱🏾‍🫲🏻</div>
            <div className="emoji emoji-button">🫱🏾‍🫲🏼</div>
            <div className="emoji emoji-button">🫱🏾‍🫲🏽</div>
            <div className="emoji emoji-button">🫱🏾‍🫲🏿</div>
            <div className="emoji emoji-button">🫱🏿‍🫲🏻</div>
            <div className="emoji emoji-button">🫱🏿‍🫲🏼</div>
            <div className="emoji emoji-button">🫱🏿‍🫲🏽</div>
            <div className="emoji emoji-button">🫱🏿‍🫲🏾</div>
            <div className="emoji emoji-button">🫦</div>
            <div className="emoji emoji-button">🫅</div>
            <div className="emoji emoji-button">🫅🏻</div>
            <div className="emoji emoji-button">🫅🏼</div>
            <div className="emoji emoji-button">🫅🏽</div>
            <div className="emoji emoji-button">🫅🏾</div>
            <div className="emoji emoji-button">🫅🏿</div>
            <div className="emoji emoji-button">🫃</div>
            <div className="emoji emoji-button">🫃🏻</div>
            <div className="emoji emoji-button">🫃🏼</div>
            <div className="emoji emoji-button">🫃🏽</div>
            <div className="emoji emoji-button">🫃🏾</div>
            <div className="emoji emoji-button">🫃🏿</div>
            <div className="emoji emoji-button">🫄</div>
            <div className="emoji emoji-button">🫄🏻</div>
            <div className="emoji emoji-button">🫄🏼</div>
            <div className="emoji emoji-button">🫄🏽</div>
            <div className="emoji emoji-button">🫄🏾</div>
            <div className="emoji emoji-button">🫄🏿</div>
            <div className="emoji emoji-button">🧌</div>
            <div className="emoji emoji-button">🪸</div>
            <div className="emoji emoji-button">🪷</div>
            <div className="emoji emoji-button">🪹</div>
            <div className="emoji emoji-button">🪺</div>
            <div className="emoji emoji-button">🫘</div>
            <div className="emoji emoji-button">🫗</div>
            <div className="emoji emoji-button">🫙</div>
            <div className="emoji emoji-button">🛝</div>
            <div className="emoji emoji-button">🛞</div>
            <div className="emoji emoji-button">🛟</div>
            <div className="emoji emoji-button">🪬</div>
            <div className="emoji emoji-button">🪩</div>
            <div className="emoji emoji-button">🪫</div>
            <div className="emoji emoji-button">🩼</div>
            <div className="emoji emoji-button">🩻</div>
            <div className="emoji emoji-button">🫧</div>
            <div className="emoji emoji-button">🪪</div>
            <div className="emoji emoji-button">🟰</div>
          </div>
        </div>
        <div className="flex flex-col w-full gap-5 pb-10">
          <div className="w-full">
            Emojis from
            <a href="https://emojipedia.org/emoji-13.1" title="New 2021 Emojis"
              >Emoji 13.1</a
            >: Added in 2021.
          </div>
          
          <button id="copy-all-emojis-7" type="button" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600" onClick={copyAllEmojis}>
            Copy All Emojis
          </button>
          <div id="all-emojis" className="flex flex-wrap">
            <div className="emoji emoji-button">😮‍💨</div>
            <div className="emoji emoji-button">😵‍💫</div>
            <div className="emoji emoji-button">😶‍🌫️</div>
            <div className="emoji emoji-button">❤️‍🔥</div>
            <div className="emoji emoji-button">❤️‍🩹</div>
            <div className="emoji emoji-button">🧔‍♀️</div>
            <div className="emoji emoji-button">🧔🏻‍♀️</div>
            <div className="emoji emoji-button">🧔🏼‍♀️</div>
            <div className="emoji emoji-button">🧔🏽‍♀️</div>
            <div className="emoji emoji-button">🧔🏾‍♀️</div>
            <div className="emoji emoji-button">🧔🏿‍♀️</div>
            <div className="emoji emoji-button">🧔‍♂️</div>
            <div className="emoji emoji-button">🧔🏻‍♂️</div>
            <div className="emoji emoji-button">🧔🏼‍♂️</div>
            <div className="emoji emoji-button">🧔🏽‍♂️</div>
            <div className="emoji emoji-button">🧔🏾‍♂️</div>
            <div className="emoji emoji-button">🧔🏿‍♂️</div>
            <div className="emoji emoji-button">💑🏻</div>
            <div className="emoji emoji-button">💑🏼</div>
            <div className="emoji emoji-button">💑🏽</div>
            <div className="emoji emoji-button">💑🏾</div>
            <div className="emoji emoji-button">💑🏿</div>
            <div className="emoji emoji-button">💏🏻</div>
            <div className="emoji emoji-button">💏🏼</div>
            <div className="emoji emoji-button">💏🏽</div>
            <div className="emoji emoji-button">💏🏾</div>
            <div className="emoji emoji-button">💏🏿</div>
            <div className="emoji emoji-button">👨🏻‍❤️‍👨🏻</div>
            <div className="emoji emoji-button">👨🏻‍❤️‍👨🏼</div>
            <div className="emoji emoji-button">👨🏻‍❤️‍👨🏽</div>
            <div className="emoji emoji-button">👨🏻‍❤️‍👨🏾</div>
            <div className="emoji emoji-button">👨🏻‍❤️‍👨🏿</div>
            <div className="emoji emoji-button">👨🏼‍❤️‍👨🏻</div>
            <div className="emoji emoji-button">👨🏼‍❤️‍👨🏼</div>
            <div className="emoji emoji-button">👨🏼‍❤️‍👨🏽</div>
            <div className="emoji emoji-button">👨🏼‍❤️‍👨🏾</div>
            <div className="emoji emoji-button">👨🏼‍❤️‍👨🏿</div>
            <div className="emoji emoji-button">👨🏽‍❤️‍👨🏻</div>
            <div className="emoji emoji-button">👨🏽‍❤️‍👨🏼</div>
            <div className="emoji emoji-button">👨🏽‍❤️‍👨🏽</div>
            <div className="emoji emoji-button">👨🏽‍❤️‍👨🏾</div>
            <div className="emoji emoji-button">👨🏽‍❤️‍👨🏿</div>
            <div className="emoji emoji-button">👨🏾‍❤️‍👨🏻</div>
            <div className="emoji emoji-button">👨🏾‍❤️‍👨🏼</div>
            <div className="emoji emoji-button">👨🏾‍❤️‍👨🏽</div>
            <div className="emoji emoji-button">👨🏾‍❤️‍👨🏾</div>
            <div className="emoji emoji-button">👨🏾‍❤️‍👨🏿</div>
            <div className="emoji emoji-button">👨🏿‍❤️‍👨🏻</div>
            <div className="emoji emoji-button">👨🏿‍❤️‍👨🏼</div>
            <div className="emoji emoji-button">👨🏿‍❤️‍👨🏽</div>
            <div className="emoji emoji-button">👨🏿‍❤️‍👨🏾</div>
            <div className="emoji emoji-button">👨🏿‍❤️‍👨🏿</div>
            <div className="emoji emoji-button">👩🏻‍❤️‍👨🏻</div>
            <div className="emoji emoji-button">👩🏻‍❤️‍👨🏼</div>
            <div className="emoji emoji-button">👩🏻‍❤️‍👨🏽</div>
            <div className="emoji emoji-button">👩🏻‍❤️‍👨🏾</div>
            <div className="emoji emoji-button">👩🏻‍❤️‍👨🏿</div>
            <div className="emoji emoji-button">👩🏻‍❤️‍👩🏻</div>
            <div className="emoji emoji-button">👩🏻‍❤️‍👩🏼</div>
            <div className="emoji emoji-button">👩🏻‍❤️‍👩🏽</div>
            <div className="emoji emoji-button">👩🏻‍❤️‍👩🏾</div>
            <div className="emoji emoji-button">👩🏻‍❤️‍👩🏿</div>
            <div className="emoji emoji-button">👩🏼‍❤️‍👨🏻</div>
            <div className="emoji emoji-button">👩🏼‍❤️‍👨🏼</div>
            <div className="emoji emoji-button">👩🏼‍❤️‍👨🏽</div>
            <div className="emoji emoji-button">👩🏼‍❤️‍👨🏾</div>
            <div className="emoji emoji-button">👩🏼‍❤️‍👨🏿</div>
            <div className="emoji emoji-button">👩🏼‍❤️‍👩🏻</div>
            <div className="emoji emoji-button">👩🏼‍❤️‍👩🏼</div>
            <div className="emoji emoji-button">👩🏼‍❤️‍👩🏽</div>
            <div className="emoji emoji-button">👩🏼‍❤️‍👩🏾</div>
            <div className="emoji emoji-button">👩🏼‍❤️‍👩🏿</div>
            <div className="emoji emoji-button">👩🏽‍❤️‍👨🏻</div>
            <div className="emoji emoji-button">👩🏽‍❤️‍👨🏼</div>
            <div className="emoji emoji-button">👩🏽‍❤️‍👨🏽</div>
            <div className="emoji emoji-button">👩🏽‍❤️‍👨🏾</div>
            <div className="emoji emoji-button">👩🏽‍❤️‍👨🏿</div>
            <div className="emoji emoji-button">👩🏽‍❤️‍👩🏻</div>
            <div className="emoji emoji-button">👩🏽‍❤️‍👩🏼</div>
            <div className="emoji emoji-button">👩🏽‍❤️‍👩🏽</div>
            <div className="emoji emoji-button">👩🏽‍❤️‍👩🏾</div>
            <div className="emoji emoji-button">👩🏽‍❤️‍👩🏿</div>
            <div className="emoji emoji-button">👩🏾‍❤️‍👨🏻</div>
            <div className="emoji emoji-button">👩🏾‍❤️‍👨🏼</div>
            <div className="emoji emoji-button">👩🏾‍❤️‍👨🏽</div>
            <div className="emoji emoji-button">👩🏾‍❤️‍👨🏾</div>
            <div className="emoji emoji-button">👩🏾‍❤️‍👨🏿</div>
            <div className="emoji emoji-button">👩🏾‍❤️‍👩🏻</div>
            <div className="emoji emoji-button">👩🏾‍❤️‍👩🏼</div>
            <div className="emoji emoji-button">👩🏾‍❤️‍👩🏽</div>
            <div className="emoji emoji-button">👩🏾‍❤️‍👩🏾</div>
            <div className="emoji emoji-button">👩🏾‍❤️‍👩🏿</div>
            <div className="emoji emoji-button">👩🏿‍❤️‍👨🏻</div>
            <div className="emoji emoji-button">👩🏿‍❤️‍👨🏼</div>
            <div className="emoji emoji-button">👩🏿‍❤️‍👨🏽</div>
            <div className="emoji emoji-button">👩🏿‍❤️‍👨🏾</div>
            <div className="emoji emoji-button">👩🏿‍❤️‍👨🏿</div>
            <div className="emoji emoji-button">👩🏿‍❤️‍👩🏻</div>
            <div className="emoji emoji-button">👩🏿‍❤️‍👩🏼</div>
            <div className="emoji emoji-button">👩🏿‍❤️‍👩🏽</div>
            <div className="emoji emoji-button">👩🏿‍❤️‍👩🏾</div>
            <div className="emoji emoji-button">👩🏿‍❤️‍👩🏿</div>
            <div className="emoji emoji-button">🧑🏻‍❤️‍🧑🏼</div>
            <div className="emoji emoji-button">🧑🏻‍❤️‍🧑🏽</div>
            <div className="emoji emoji-button">🧑🏻‍❤️‍🧑🏾</div>
            <div className="emoji emoji-button">🧑🏻‍❤️‍🧑🏿</div>
            <div className="emoji emoji-button">🧑🏼‍❤️‍🧑🏻</div>
            <div className="emoji emoji-button">🧑🏼‍❤️‍🧑🏽</div>
            <div className="emoji emoji-button">🧑🏼‍❤️‍🧑🏾</div>
            <div className="emoji emoji-button">🧑🏼‍❤️‍🧑🏿</div>
            <div className="emoji emoji-button">🧑🏽‍❤️‍🧑🏻</div>
            <div className="emoji emoji-button">🧑🏽‍❤️‍🧑🏼</div>
            <div className="emoji emoji-button">🧑🏽‍❤️‍🧑🏾</div>
            <div className="emoji emoji-button">🧑🏽‍❤️‍🧑🏿</div>
            <div className="emoji emoji-button">🧑🏾‍❤️‍🧑🏻</div>
            <div className="emoji emoji-button">🧑🏾‍❤️‍🧑🏼</div>
            <div className="emoji emoji-button">🧑🏾‍❤️‍🧑🏽</div>
            <div className="emoji emoji-button">🧑🏾‍❤️‍🧑🏿</div>
            <div className="emoji emoji-button">🧑🏿‍❤️‍🧑🏻</div>
            <div className="emoji emoji-button">🧑🏿‍❤️‍🧑🏼</div>
            <div className="emoji emoji-button">🧑🏿‍❤️‍🧑🏽</div>
            <div className="emoji emoji-button">🧑🏿‍❤️‍🧑🏾</div>
            <div className="emoji emoji-button">👨🏻‍❤️‍💋‍👨🏻</div>
            <div className="emoji emoji-button">👨🏻‍❤️‍💋‍👨🏼</div>
            <div className="emoji emoji-button">👨🏻‍❤️‍💋‍👨🏽</div>
            <div className="emoji emoji-button">👨🏻‍❤️‍💋‍👨🏾</div>
            <div className="emoji emoji-button">👨🏻‍❤️‍💋‍👨🏿</div>
            <div className="emoji emoji-button">👨🏼‍❤️‍💋‍👨🏻</div>
            <div className="emoji emoji-button">👨🏼‍❤️‍💋‍👨🏼</div>
            <div className="emoji emoji-button">👨🏼‍❤️‍💋‍👨🏽</div>
            <div className="emoji emoji-button">👨🏼‍❤️‍💋‍👨🏾</div>
            <div className="emoji emoji-button">👨🏼‍❤️‍💋‍👨🏿</div>
            <div className="emoji emoji-button">👨🏽‍❤️‍💋‍👨🏻</div>
            <div className="emoji emoji-button">👨🏽‍❤️‍💋‍👨🏼</div>
            <div className="emoji emoji-button">👨🏽‍❤️‍💋‍👨🏽</div>
            <div className="emoji emoji-button">👨🏽‍❤️‍💋‍👨🏾</div>
            <div className="emoji emoji-button">👨🏽‍❤️‍💋‍👨🏿</div>
            <div className="emoji emoji-button">👨🏾‍❤️‍💋‍👨🏻</div>
            <div className="emoji emoji-button">👨🏾‍❤️‍💋‍👨🏼</div>
            <div className="emoji emoji-button">👨🏾‍❤️‍💋‍👨🏽</div>
            <div className="emoji emoji-button">👨🏾‍❤️‍💋‍👨🏾</div>
            <div className="emoji emoji-button">👨🏾‍❤️‍💋‍👨🏿</div>
            <div className="emoji emoji-button">👨🏿‍❤️‍💋‍👨🏻</div>
            <div className="emoji emoji-button">👨🏿‍❤️‍💋‍👨🏼</div>
            <div className="emoji emoji-button">👨🏿‍❤️‍💋‍👨🏽</div>
            <div className="emoji emoji-button">👨🏿‍❤️‍💋‍👨🏾</div>
            <div className="emoji emoji-button">👨🏿‍❤️‍💋‍👨🏿</div>
            <div className="emoji emoji-button">👩🏻‍❤️‍💋‍👨🏻</div>
            <div className="emoji emoji-button">👩🏻‍❤️‍💋‍👨🏼</div>
            <div className="emoji emoji-button">👩🏻‍❤️‍💋‍👨🏽</div>
            <div className="emoji emoji-button">👩🏻‍❤️‍💋‍👨🏾</div>
            <div className="emoji emoji-button">👩🏻‍❤️‍💋‍👨🏿</div>
            <div className="emoji emoji-button">👩🏻‍❤️‍💋‍👩🏻</div>
            <div className="emoji emoji-button">👩🏻‍❤️‍💋‍👩🏼</div>
            <div className="emoji emoji-button">👩🏻‍❤️‍💋‍👩🏽</div>
            <div className="emoji emoji-button">👩🏻‍❤️‍💋‍👩🏾</div>
            <div className="emoji emoji-button">👩🏻‍❤️‍💋‍👩🏿</div>
            <div className="emoji emoji-button">👩🏼‍❤️‍💋‍👨🏻</div>
            <div className="emoji emoji-button">👩🏼‍❤️‍💋‍👨🏼</div>
            <div className="emoji emoji-button">👩🏼‍❤️‍💋‍👨🏽</div>
            <div className="emoji emoji-button">👩🏼‍❤️‍💋‍👨🏾</div>
            <div className="emoji emoji-button">👩🏼‍❤️‍💋‍👨🏿</div>
            <div className="emoji emoji-button">👩🏼‍❤️‍💋‍👩🏻</div>
            <div className="emoji emoji-button">👩🏼‍❤️‍💋‍👩🏼</div>
            <div className="emoji emoji-button">👩🏼‍❤️‍💋‍👩🏽</div>
            <div className="emoji emoji-button">👩🏼‍❤️‍💋‍👩🏾</div>
            <div className="emoji emoji-button">👩🏼‍❤️‍💋‍👩🏿</div>
            <div className="emoji emoji-button">👩🏽‍❤️‍💋‍👨🏻</div>
            <div className="emoji emoji-button">👩🏽‍❤️‍💋‍👨🏼</div>
            <div className="emoji emoji-button">👩🏽‍❤️‍💋‍👨🏽</div>
            <div className="emoji emoji-button">👩🏽‍❤️‍💋‍👨🏾</div>
            <div className="emoji emoji-button">👩🏽‍❤️‍💋‍👨🏿</div>
            <div className="emoji emoji-button">👩🏽‍❤️‍💋‍👩🏻</div>
            <div className="emoji emoji-button">👩🏽‍❤️‍💋‍👩🏼</div>
            <div className="emoji emoji-button">👩🏽‍❤️‍💋‍👩🏽</div>
            <div className="emoji emoji-button">👩🏽‍❤️‍💋‍👩🏾</div>
            <div className="emoji emoji-button">👩🏽‍❤️‍💋‍👩🏿</div>
            <div className="emoji emoji-button">👩🏾‍❤️‍💋‍👨🏻</div>
            <div className="emoji emoji-button">👩🏾‍❤️‍💋‍👨🏼</div>
            <div className="emoji emoji-button">👩🏾‍❤️‍💋‍👨🏽</div>
            <div className="emoji emoji-button">👩🏾‍❤️‍💋‍👨🏾</div>
            <div className="emoji emoji-button">👩🏾‍❤️‍💋‍👨🏿</div>
            <div className="emoji emoji-button">👩🏾‍❤️‍💋‍👩🏻</div>
            <div className="emoji emoji-button">👩🏾‍❤️‍💋‍👩🏼</div>
            <div className="emoji emoji-button">👩🏾‍❤️‍💋‍👩🏽</div>
            <div className="emoji emoji-button">👩🏾‍❤️‍💋‍👩🏾</div>
            <div className="emoji emoji-button">👩🏾‍❤️‍💋‍👩🏿</div>
            <div className="emoji emoji-button">👩🏿‍❤️‍💋‍👨🏻</div>
            <div className="emoji emoji-button">👩🏿‍❤️‍💋‍👨🏼</div>
            <div className="emoji emoji-button">👩🏿‍❤️‍💋‍👨🏽</div>
            <div className="emoji emoji-button">👩🏿‍❤️‍💋‍👨🏾</div>
            <div className="emoji emoji-button">👩🏿‍❤️‍💋‍👨🏿</div>
            <div className="emoji emoji-button">👩🏿‍❤️‍💋‍👩🏻</div>
            <div className="emoji emoji-button">👩🏿‍❤️‍💋‍👩🏼</div>
            <div className="emoji emoji-button">👩🏿‍❤️‍💋‍👩🏽</div>
            <div className="emoji emoji-button">👩🏿‍❤️‍💋‍👩🏾</div>
            <div className="emoji emoji-button">👩🏿‍❤️‍💋‍👩🏿</div>
            <div className="emoji emoji-button">🧑🏻‍❤️‍💋‍🧑🏼</div>
            <div className="emoji emoji-button">🧑🏻‍❤️‍💋‍🧑🏽</div>
            <div className="emoji emoji-button">🧑🏻‍❤️‍💋‍🧑🏾</div>
            <div className="emoji emoji-button">🧑🏻‍❤️‍💋‍🧑🏿</div>
            <div className="emoji emoji-button">🧑🏼‍❤️‍💋‍🧑🏻</div>
            <div className="emoji emoji-button">🧑🏼‍❤️‍💋‍🧑🏽</div>
            <div className="emoji emoji-button">🧑🏼‍❤️‍💋‍🧑🏾</div>
            <div className="emoji emoji-button">🧑🏼‍❤️‍💋‍🧑🏿</div>
            <div className="emoji emoji-button">🧑🏽‍❤️‍💋‍🧑🏻</div>
            <div className="emoji emoji-button">🧑🏽‍❤️‍💋‍🧑🏼</div>
            <div className="emoji emoji-button">🧑🏽‍❤️‍💋‍🧑🏾</div>
            <div className="emoji emoji-button">🧑🏽‍❤️‍💋‍🧑🏿</div>
            <div className="emoji emoji-button">🧑🏾‍❤️‍💋‍🧑🏻</div>
            <div className="emoji emoji-button">🧑🏾‍❤️‍💋‍🧑🏼</div>
            <div className="emoji emoji-button">🧑🏾‍❤️‍💋‍🧑🏽</div>
            <div className="emoji emoji-button">🧑🏾‍❤️‍💋‍🧑🏿</div>
            <div className="emoji emoji-button">🧑🏿‍❤️‍💋‍🧑🏻</div>
            <div className="emoji emoji-button">🧑🏿‍❤️‍💋‍🧑🏼</div>
            <div className="emoji emoji-button">🧑🏿‍❤️‍💋‍🧑🏽</div>
            <div className="emoji emoji-button">🧑🏿‍❤️‍💋‍🧑🏾</div>
          </div>
        </div>
      </section>
      <form
        className="w-full flex overflow-hidden"
        role="search"
        action="https://emojipedia.org/search"
        method="get"
      >
        <input
          type="text"
          className="w-full h-10 p-4 border border-grey/10 rounded-tl-md rounded-bl-md focus:outline-blue/20"
          placeholder="Find emojis by name or description"
          id="srch-term"
          name="q"
        /><button
          type="submit"
          className="w-10 flex items-center justify-center border border-grey/10 rounded-tr-md rounded-br-md border-l-0 hover:bg-grey/10"
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_1337_1457)">
              <path
                d="M13.9043 12.8215L10.5848 9.50195C10.5219 9.43906 10.4398 9.40625 10.3523 9.40625H9.99141C10.8527 8.4082 11.375 7.10938 11.375 5.6875C11.375 2.5457 8.8293 0 5.6875 0C2.5457 0 0 2.5457 0 5.6875C0 8.8293 2.5457 11.375 5.6875 11.375C7.10938 11.375 8.4082 10.8527 9.40625 9.99141V10.3523C9.40625 10.4398 9.4418 10.5219 9.50195 10.5848L12.8215 13.9043C12.95 14.0328 13.1578 14.0328 13.2863 13.9043L13.9043 13.2863C14.0328 13.1578 14.0328 12.95 13.9043 12.8215ZM5.6875 10.0625C3.27031 10.0625 1.3125 8.10469 1.3125 5.6875C1.3125 3.27031 3.27031 1.3125 5.6875 1.3125C8.10469 1.3125 10.0625 3.27031 10.0625 5.6875C10.0625 8.10469 8.10469 10.0625 5.6875 10.0625Z"
                fill="#111111"
              ></path>
            </g>
            <defs>
              <clipPath id="clip0_1337_1457">
                <rect width="14" height="14" fill="white"></rect>
              </clipPath>
            </defs>
          </svg>
        </button>
      </form>
      <div
        className="flex w-full justify-center items-center min-h-[280px]"
        data-freestar-ad="__336x280 __970x250"
        id="getemoji.com_billboard_bottom_v3"
        data-ad-name="getemoji.com_billboard_bottom_v3"
        data-google-query-id="CNSBg9_tmpcDFa-GzgEduD4zMg"
      >
        <div
          id="google_ads_iframe_/21872898416/FS_getemoji_com_billboard_bottom_0__container__"
          style={{ border: "0pt", width: "728px", height: "0px" }}
        >
          <div className="__fs-ancillary" style={{ visibility: "hidden" }}>
            <div className="__fs-branding">
              <a
                href="https://ads.freestar.com/?utm_campaign=branding&amp;utm_medium=display&amp;utm_source=getemoji.com&amp;utm_content=getemoji.com_billboard_bottom_v3"
                target="_blank"
                rel="noreferrer"
                ><img
                  src="https://a.pub.network/core/imgs/fslogo-green.svg"
                  alt="freestar"
                  width="14"
                  height="14"
              /></a>
            </div>
            <div className="fs-branding-spacer"></div>
          </div>
        </div>
      </div>
      <p>
        If you can see the color emoji designs on this page then you already
        have a font that includes emoji on your device. No copyright to these
        images is held by this site. Only see boxes? You might be using an
        <a href="http://caniemoji.com">unsupported browser</a>. Search results
        provided by
        <a href="https://emojipedia.org">Emojipedia</a> which lists the
        <a href="https://emojipedia.org/emoji/">Unicode names for each emoji</a
        >. Read our
        <a
          href="https://help.zedge.net/hc/en-us/articles/360028821051-Privacy-Policy"
          target="_blank"
          >privacy policy</a
        >
        and
        <a href="https://zedge.net/terms" target="_blank">terms of service</a
        >.
        <a href="#">Consent Choices</a>.
        <button id="pmLink">Privacy Manager.</button>
      </p>
      <div className="flex w-full justify-center items-center">
        <p>
          <iframe
            id="twitter-widget-0"
            scrolling="no"
            frameBorder="0"
            allowTransparency
            allowFullScreen
            className="twitter-follow-button twitter-follow-button-rendered"
            style={{ position: "static", visibility: "visible", width: "154px", height: "28px" }}
            title="Twitter Follow Button"
            src="https://platform.twitter.com/widgets/follow_button.1227a5674072e080ffb1ba14ac0c1079.en.html#dnt=false&amp;id=twitter-widget-0&amp;lang=en&amp;screen_name=GetEmoji&amp;show_count=false&amp;show_screen_name=true&amp;size=l&amp;time=1790927735439"
            data-screen-name="GetEmoji"
          ></iframe>
        </p>
      </div>
    </div>
    
  </main>
</div>
  );
}
