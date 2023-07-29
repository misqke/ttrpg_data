import React from "react";
import Link from "next/link";

const NavBar = () => {
  return (
    <nav className="flex items-center justify-between flex-wrap bg-teal-500 py-2 px-4 w-screen">
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <Link href="/" className="block text-teal-200 hover:text-white mr-4">
          TTRPG Data
        </Link>

        <div className="text-sm nav-row">
          <Link href="/" className="block text-teal-200 hover:text-white mr-4">
            Character Creation
          </Link>
          <Link
            href="/talents"
            className="block text-teal-200 hover:text-white mr-4"
          >
            Talents
          </Link>
          <div className="block text-teal-200 hover:text-white mr-4 navDropdown">
            <span>Magic</span>
            <ul>
              <li>
                <Link
                  href="/spells"
                  className="block text-teal-200 hover:text-white mr-4"
                >
                  Spells
                </Link>
              </li>
              <li>
                <Link
                  href="/arcane_specializations"
                  className="block text-teal-200 hover:text-white mr-4"
                >
                  Arcane Specializations
                </Link>
              </li>
              <li>
                <Link
                  href="/meta_magic"
                  className="block text-teal-200 hover:text-white mr-4"
                >
                  Meta Magic
                </Link>
              </li>
            </ul>
          </div>

          <div className="block text-teal-200 hover:text-white mr-4 navDropdown">
            <span>Martial</span>
            <ul>
              <li>
                <Link
                  href="/fighting_styles"
                  className="block text-teal-200 hover:text-white mr-4"
                >
                  Fighting Styles
                </Link>
              </li>
              <li>
                <Link
                  href="/combat_maneuvers"
                  className="block text-teal-200 hover:text-white mr-4"
                >
                  Combat Maneuvers
                </Link>
              </li>
            </ul>
          </div>

          <div className="block text-teal-200 hover:text-white mr-4 navDropdown">
            <span>Rules</span>
            <ul>
              <li>
                <Link
                  href="/GeneralRules"
                  className="block text-teal-200 hover:text-white mr-4"
                >
                  General Rules
                </Link>
              </li>
              <li>
                <Link
                  href="/CombatRules"
                  className="block text-teal-200 hover:text-white mr-4"
                >
                  Combat Rules
                </Link>
              </li>
              <li>
                <Link
                  href="/RestingRules"
                  className="block text-teal-200 hover:text-white mr-4"
                >
                  Resting Rules
                </Link>
              </li>
            </ul>
          </div>

          <Link
            href="/General"
            className="block text-teal-200 hover:text-white mr-4"
          >
            General Discussion
          </Link>
        </div>
        <div></div>
      </div>
    </nav>
  );
};

export default NavBar;
