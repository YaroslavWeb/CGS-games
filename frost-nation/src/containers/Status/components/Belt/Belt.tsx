import React, { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { block } from "bem-cn"

import { IPlayer } from "interfaces"
import { useOvermind } from "store"

import "./styles.scss"

const BEM = block("belt")

interface BeltProps {
  player: IPlayer
}

export function Belt({ player }: BeltProps) {
  const { actions } = useOvermind()

  const boxRef = useRef<HTMLDivElement>(null)
  const constraintsRef = useRef<HTMLDivElement>(null)
  const [currentIdx, setCurrentIdx] = useState<number>(0)
  const [nextIdx, setNextIdx] = useState<number>(0)
  const [isDrag, setDrag] = useState<boolean>(false)
  const [boxSize, setBoxSize] = useState<number>(0)

  useEffect(() => {
    const size: number = boxRef.current?.offsetWidth || 0
    setBoxSize(size)
    const resizeListener = () => {
      setBoxSize(size)
    }

    window.addEventListener("resize", resizeListener)

    return () => {
      window.removeEventListener("resize", resizeListener)
    }
  }, [])

  return (
    <div className={BEM()}>
      <span className={BEM("label")}>Пояс</span>
      <motion.div
        className={BEM("container")}
        ref={constraintsRef}
        style={{
          gridTemplateColumns: `repeat(${player.inventory.capacityBelt}, 1fr)`,
        }}
      >
        {player.inventory.belt.map((item, idx: number) => {
          return (
            <motion.div
              key={idx}
              ref={boxRef}
              className={BEM("box")}
              dragPropagation
              style={{
                height: boxSize,
              }}
              onHoverStart={() => {
                if (isDrag) {
                  setNextIdx(idx)
                }
              }}
            >
              {item && (
                <motion.div
                  className={BEM("item")}
                  style={{ zIndex: idx !== currentIdx ? 1000 : 1 }}
                  drag={item.name !== "Empty"}
                  dragElastic={1}
                  dragConstraints={{ top: 0, right: 0, bottom: 0, left: 0 }}
                  onDragStart={() => {
                    setDrag(true)
                    setCurrentIdx(idx)
                  }}
                  onDragEnd={() => {
                    setDrag(false)
                    if (
                      currentIdx !== -1 &&
                      nextIdx !== -1 &&
                      currentIdx !== nextIdx
                    ) {
                      actions.dragItem({ currentIdx, nextIdx })
                    }
                    setCurrentIdx(-1)
                    setNextIdx(-1)
                  }}
                  whileHover={{
                    scale: 1.03,
                  }}
                  whileTap={{
                    scale: 1.05,
                  }}
                >
                  {item.icon}
                </motion.div>
              )}
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}
