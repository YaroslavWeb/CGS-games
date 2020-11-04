import React from "react"
import { block } from "bem-cn"

import { ReactComponent as CashIcon } from "assets/icons/cash.svg"
import { ReactComponent as TrashIcon } from "assets/icons/trash.svg"
import { IconButton } from "components/IconButton"
import { IPlayer } from "interfaces"
import "./styles.scss"

const BEM = block("bottom-panel")

interface BottomPanel {
  player: IPlayer
  isBackpack: boolean
  isCompass: boolean
  handleBackpack: () => void
  handleCompass: () => void
}

export function BottomPanel({
  player,
  isBackpack,
  isCompass,
  handleBackpack,
  handleCompass,
}: BottomPanel) {
  return (
    <div className={BEM()}>
      <IconButton
        onClick={handleBackpack}
        icon="backpack"
        active={isBackpack}
      />
      <IconButton onClick={handleCompass} icon="compass" active={isCompass} />
      <div className={BEM("resources")}>
        <TrashIcon style={{ height: "100%", width: "100%" }} />
        <p className={BEM("trash")}>{player.trash}</p>
      </div>
      <div className={BEM("resources")}>
        <CashIcon style={{ height: "100%", width: "100%" }} />
        <p className={BEM("cash")}>{player.cash}</p>
      </div>
    </div>
  )
}