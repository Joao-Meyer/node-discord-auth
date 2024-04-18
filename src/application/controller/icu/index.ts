import type { Controller } from '../../protocols';
import type { Request, Response } from 'express';

export const IcuController: Controller = () => (request: Request, response: Response) => {
  const base64String =
    'iVBORw0KGgoAAAANSUhEUgAAASEAAAEaCAYAAABeoOF1AAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAACCiSURBVHgB7Z0JlB1Vmce/Gx0Fj4SOyxlJgjQIBMaFDkZIGIEEBXOGrQN6DC6nE9m3oQPIptIdxmVg0CSAgoA0ceAcQCABGSERpgmiAVySzIwKg5JgCOKgdhaGIYzTd+pW3eW79V62ftV961b9f/rRb6n3uvL6vX/9v/+9dZ8gIkkAABCIUQQAAAGBCAEAggIRAgAEBSIEAAgKRAgAEBSIEAAgKBAhAEBQIEIAgKBAhAAAQYEIAQCCAhECAAQFIgQACApECAAQFIgQACAoECEAQFAgQgCAoECEAABBgQgBAIICEQIABAUiBAAICkQIABAUiBAAICgQIQBAUCBCAICgQIQAAEGBCAEAggIRAgAEBSIEAAgKRAgAEBSIEAAgKBAhAEBQIEIAgKBAhAAAQYEIAQCCAhECAAQFIgQACApECAAQFIgQACAoECEAQFAgQgCAoECEAABBgQgBAIICEQIABAUiBAAICkQIABAUiBAAICgQIQBAUCBCAICgQIQAAEGBCAEAggIRAgAEBSIEAAgKRAgAEBSIEAAgKBAhAEBQIEJgh2hra6Oenh5avXo1SSlpYGCA+vv7qauriwAYKhKF2p7q7OyUiejILdHX1yfb29uj+jehSlFR7SwqQClhSdyO3B6USHV3d0f170MFr6h2FjXClbReW3U/WyJp1+CKUNtbUe0saoRq6tSpqZC0yrx58yBGqG1VVDuLGuZKgudUOIpEiVkSXEf1OqBGtKLaWdQw1nnnnTek1mt7WbRoEVwRqllFtbOoYagdCZ6LQOVMMb0+qGGvqHYWVWCp1ksJQghUi6aG/GN6vVDDVlHtLKqgKip4bhXMLUJRZDuLarGU+1HZTJlAcF37impnUS3UcAfPrYK5RbWtqHYWNYTq6OgY0eC5VVROpRxbTK8xqqWKamdRO1DDMednpECLVquKamdR21llCZ5bBcF1LSqqnUVto0Z6zs9IoHIszC2qdEW1s6itVNmD51ZBcF3ZimpnUU1KtV4rVqyQdQEtWuUqqp1FsYo5eG4VBNeVqqh2FqVrW6sc1gWVf8EVRV9R7Wztq4rBcxEguI66otrZWtdQVzmsC2jRoq2odraWVZU5PyMFguvoKqqdrVXVOXhuFSXaWHA/mopqZ2tTVZ/zM1JgblEUFdXOVr4QPA8PWHC/1BXVzla2zCqHcD/DB4Lr0lZUO1vJQvA8siC4Ll1FtbOVKuV+1AcChAFzi0pTUe1sZQrBczlQDlQt+hbTe6eCFdXORl+xrXJYF9CiBa2odjbawpyf8oPgOkwJfQEMI0nwTMmRlpIjLYHys3LlSpoxYwatWbOGwPAzisCwoUQnab3SggDFQ9IyU+KKKAmuCYwMUVi22ArBczVAizYiFdXOlr7UnB8Ez9UDwfWwVlQ7W9pC8Fx9lLPFSbHFF4LpAujs7KREgJD71AQVWE+bNg3BdUEgmG4BEzwvWrQIAlQj1N9aBdcY8SwGiNAQUSMnK1asSIffQT2ZNWtWehBKgmsCQwft2A6COT+gGYsXL6Y5c+agRRsCcELbSRI8p7kP5vyAZqhcEHOLhk4UCXrIwpwfsCOouUXqK5lieo+HLLRjW0E5HtV6IfcBQ+HWW2+luXPnokXbBm9IqpeAh2q9Lr744vRNtN9++xEAQ0Gd/qHatPXr19OqVasINAdOKAeCZzAcYG7RlkEwrVHuR4kPgmcwHJi5RSq4Vu814EA7lpAEz+kQ6+TJkwmA4UQ57ZkzZ6JFY9S6HVM9uxp2R/AMQoDgOqOWIqTssLLF3d3dBEBIlCOaP39+KkZ1pXYihOAZlJE6B9e1CaaxyiEoM3U+KbYWwbQKnu+44w7M+QGlp45ziyrdjmHGM4gZNWKrFtyvOpV2QmrkSx1VAIgR5dyFEPToo49Slam0ExoYGMDEMBA16uuHJk6cSFWm0sE0BAiA8lNpEaq6jQXVRzmhqlPpdkyNNKgheTgiECN1mTtUaSdk+mk4IhAbamRMvXfrMHmx8pMVzdFk9uzZWEYBlB7zflVD82quUB2ozVn0yhXdd999NGbMmLRNA6BMKMG58sor04Pl008/TXWiliewKhHCd4WBsrBs2bL064Pq6tRruaiZckV77rlnrc9cBuFR7keJj5rRX+eooNYrK/b29qZitHDhQgJgJFmwYAHeexqsMa1RRyS1xhBaNDCcKBeuviQRI7YOLO+qMcG1OlcHy7yColGt16WXXopR2ibACTXBrD0EVwSKoO7B87bAt200Qb1ZVL+ubHNd5mqA4jFzfuoePG8LiNBWUGv/qlmrCA/BjqJGXjFbf/sp9fdUl6USO51+xzgAWyMRHdnR0RHVe7sEFdXOBq22tjaZDOtLAPIMDAzI7u7uqN7PZSkE00MAwTXgqO8PQ344dJAJDQETXGO4td7wk6MhQEMH84RaACfF1hNzsqk60x0HodZBO1YQakF9tbA+WrRqgzk/xYN2rCDUIlQ4Kba6KPejnA/m/AwP0aTosVTihmQiShJUg/nz56cjozG9ByOrqHY2qsLcorhRc34S5xPVey7SimpnoyvlipIhXAniAXN+RrYQTI8QmFsUByrbU3N+kPuMHAimRwgztwjBdTnhC8xDgEaeaGxbVQotWrlQp+IgeA5aUe1spQrBdVhU8KwOCDG9ZypaUe1s5UodgdUQMBg5EDyXrqLa2cqWOiLDFQ0/mPNTyopqZytf6ggNMSqeFStWYM5PeSuqna1FIbguDtV6qeA5pr9/DSuqna1VIbhuDQTP0VRUO1vLwmqOO4YSbrReUVVUO1vbUkd0lWuArYPgOcqKamdrX2jRmoMF5qOuqHYWRQiuOZjzU4mKamdRrFTuUWdX1NfXh9arGhXVzqKaVN2CawTPlauodha1harDao5mzg/cT+Uqqp1FbaOqGlxjzk+lK6qdRW1HVSm4Vu6nq6srqtcftcMV1c6idqBiPykWc35qU1HtLGoIpXIU5ShiASeb1q6i2tlSVvs73iU7Jx1a7n2MoEWLZc7PtL2mywnveF/p9zOiimpnS1dKgFbP/56Utz0uV8+7O71e5v0ta3AdQ/A8dvTu8pYZ98p/O+cluSqpSeMOKfX+xlJY6L5F2t+5GyXCk11Ofj73jbupZ8bnqKwkbogmTpxICxYsoDJgFpgv+zebfuaAU+nuTz5MHxp3SHZD8vEZt8u7CbQORKgQhJV19Z/ezs/R6q/fnYjSblRG1FcaJ21P+u0fIT/46ptHlCAmLojKSuJ+qG/GPXTJoVfQLm8ebW/P/t6SQOtAhApCmBLZG1QJ0Oqr76GezpOprJivIRrp79latmxZKj5JYJ4KYlk5++AL6N6Zyv1MsbdJLT2CQFFAhIpACY9s9taU1HNc4oquuse2bGUkGQpPW6KFCxfScKIERwmear1WrlxJZWX/d7w3EZ+ldM5BF9Bo7X6U9IjkCCP03xgeqDggQkUgKX2DyiYGXTmjPZQruureRJDK7YqS0Jpmz549LK5IZVDKdSnBKzNKeBadtDQRovfR4KBURxcS+n/qQGNabgErVBgQoVYxfZi9qG+Q5mjpvmm7NxGh1VfeW9qsSKGC6yK/KdYEzyqDKnPrdVDSci0+aUkiQnOszVEHFk9t7O3pfwlNWTFAhFolTSilExzzvlU/+ZtZ373H2xNX9LXEFR1bXlekUHmNEqOhtk1KcJSQqecoc/Cs2q0vHNpLt53wvbQNy4THhc5mwMHcbpQoa7/RlBUBRKhVdBotjE8n8walhgNllhplXr73uFMSMVpE7W8vrytSLkYFyDvaovHgucxMHj+F7p+5hGZ1nKJvETbbE/YW7WXN31QaUSJQEBChVtFOSHdg7s2a28bF1sLelrqiry6inmNOoTKjWrTtCa6VUM2YMaP0c36U+/nSYT10e+J+xiVD8BwhRum/p2jebTFDJNCOFQJEqACM7Di3zkdQMtsu2O22fdOC1ZuI0OqvlN8VqeBaiVFeYEzrpdzP4sWLqcwo9/PASQ8l7ufU7Abp/fXINmJpIN14UOHCg3lCxfBGAi2TvVn121hfkdKF1NIIERMnE25KPfrS/rbd6LkvL6IFj9xJc39wM61/dROVEZXvqJyno6OD2traUgFSolTm0Fmh3E/3wXNodtJ6mYmGUgo9qulQl0clt+mBsWxUzI0t2G0hP8UBESoCIZxFF67dskF1zgEpyy/1kVaY2Y2Ubdd9xEzqPGAqzf7uFfTosz+nslLmeT55Jo+fTFd/9Ou29XJTutLZP+4oYg8SbqBBykGyDUO6iX4MoR0rCrRjLSNJ8qOkHU7RV5rYeeN+vPuFsNZftWX9532L5p04h9p23oXA0FDup+ewy+nOE+6i8buMt7cL62yYjOTGEuw9Qri2S7gthEA7VhQQoZYR7E1NLKDOrpqRXHfasPQSIzfMIt3wsHZM3dNOohWX3EZT9/kggR1jSuJ+HjrpQTq5Q0+FEEK7VGlNjzWtg5LHdcTzoeyhwv9JoEggQi1jwwPn6s3tCWKUsPe5yYwGYT8QdtaJJNemJaisqP/c62neCefDFW0Hyv1855gb6a4T7qDddx1P3hHCDL9bwbEvtn28EP7tgt2XihXcT+FAhFrGuZfsmtSl/Y7Xq/nHUD7hTVD++MueP+G8qYkruuh2mro3XNGWmP6eo+jJ2Y/Tx/Y6Sre35h5hBwmavd55f8NzuhQ+gMaeExQDRKgQ3FvajINlwkTeiJjMBQ9CsMcxG8QHgfmHJnVF59xA8zrhijjK/fQdeyPdkjggdTkTEZk748J3MdIMUTLn6mlMdhObeCr8n3BEhQERKhiRFxUdCHkfCOaK3MQ3cyfbjkTOQGlXdHjiii68nbo+dAzVndM6ZtPPZv+Ipu91ZHo9n9+QdCJurnIZaTA80h+EF2bAgI+eoSsrFAzRF4GZYSvdyEl6swl7zCGWGSEzRE9aaLzLenv+YXGDxxntbxtLt57US1PfM4nmLr2R1vz5RaoTu48eT9cc9U80Zdzk9Poga3+zgQGdPNtWWbA5PiIdajchnOQHhNxqCCYfslmRNUY4fhcFXslCMPOE/MU83Bn1JhBlhl+Q9+Zn04pcjkpu6Qi7oXlefdusxA31n/lt6ppUH1d0+sTZ1P/pf6FDxh2cXncireGDA1bsiTlS507tCkGs9cqOKblQ2opP9jdtenoOGBJwQkVgVCQ9wPI3rjo+jyIuRA0xqHBGKh+A5hfQUqMzQh/F00vaNilX1PfJuZkr+mF1XdG7E/dz7VFXZe7HC54VTIrsMKVrzdxVtg1pb6knj1rjKtjaQcQckp1sSgQNKg44oSKQ/Id/NKVcGG3cDY8ebCvG39ksEDUuyx2ZhW3pSLqjetekY6n/9Bup64PHUtVI3c+nvk+HjD84P6zl3Im9UTSOcCmaCIfZznNF2R3sV/h/G2mPGqAI4ISKgGc+6s05yI+hgt0v/Tf5oLQhtTCTFXlf5vViuV/ER3dYhtQ+Zje61bqib9OagbhdkXI/1yXu528T8ZE2nFEvHXM++nUSzJJmr5IkyYTFvFyeiKSbJ9sNOocjhXtRpVO6nP2BFSoKOKECcRPdXNvFMyJ3pHb3ZNkDMcGRme23YbfTJWe5hPns+KM7bkPqOjBxRafdFLUrOmPiLHrs09+nD++ush8jvjJrc3XobE6fYMbSIqxjdPfxAQGLZHouXBvcZEjTbUxwQkUBEWqRlc8/SwOvuDPeBcshiHLzo9kKi+mHYZRw2pNrtcxcF3cXy5rcL7PbEfmfjXRt68QV9X18LvWdOJfa28ZSLCj388AnbqevHf7FdN6PzJ1calyK99rmejSe6Ugu/9mL69pZaoji3CgYHyCw7bCwB4xn/vhLAq3zhqR6CQyZ1/73ddr8l9dp+gcmW2fjO3XBrUyGfkPbyYz63Z+2DuaTklvhz22rAmlJ/Mx9/4gt7IdIheJqq46xE6jzb6bR+tc20arf/yeVmUun/D1d/7EraZ8xe5En4uliY+QckGm5mMtxAqQfkjzGjHJZQdJ/C//VNc/hGrp85mOfQ7/et6+6ke5/+k4CrQMRKoAnfvMr2vDfr9Dkvd9LO73xTfoNPoodYbXgSPZhSdsCvkSEFhd2RDdHfbtWNbn2zDvysw+iFSpmidTTjtl5F+rcf1riiMYlQvRMKkhl4v3v3J8WnXALnTDh6OQ13Imc8yEvlzGv6aDrnUg0a49MK2vEXgjW/rI1hNjkxsw9Cecu80Kk/qbJTTc89XVasPwrBIrBCj9oHfUtGv2XXZsuxWGPmoNMMKQwsYZ91QW7LWsR9IdCknY15FZlNI9j161DcpEJmyYg3LD+INl9UGF177/eQAtX3E9l4LLJ56YOyDgQ3g2Z0yukdGJkbk9nlDMX6V5WwbbJPY47qCa/S7KRNu93Jj/WbVxLX3i4m3627icEigNOqEDWv/oKLVhyV/q2nbr/geSOz8ILRP3hYHe0Nc2AERHegmU3UNOMiM9N8n6fEFbM9MPT29p2Mq5oLK16KZwrOmz8QfTgJ26jY/b+KJnXxewrMfcivTyMhV72NnNdZo8X+fyItWmiyXMRa7dINGynuG3VzfT5JWckAv4bAsUCJzRMpK7okusSV/Qu5lZMXiN0ZqPFQjqnxJ2PNC3boDlcZ+1H5mpEOqycXjKPI2p0TqkL0kPNTVzVmoHfU2//9bRw5ci5orYkbL5syrl0zsQu3S7Jpm5FMcgynEEuTKzV8tyPvjyo9UdKfroGe37jhOx16f1ec3ndhrV02SNz6KdwP8MGnNAwkbqipXeR+iRM2+9Alg+RdSjGmTj8lf54BuQF0cTcgr7Kl5A15zXZjEjnSt7JtTLzYqkr2u+ILCsaAVek3M99J95MR7UfZg+B/HUwIuIuk3MleQco+Hl3GeacMTtdgvhjWFusn8sfeWdZUXLhu8r9LD2TVsP9DCtwQiNA6oouUq5orM5tpBMY6YJn77J2O8Ie3oWdUMcdlTBOR2/jntd3PVk2NIrdTjnnRVlW9GiSFa26j4pGuZ8vTjmHzjmwy2Uyxr2YCYjEbiOe/ZANjM0kxUHmZHgmpBgkfjtzTNz9NMuEjPvZ+AJdmmQ/T61bTmD4gRMaAZQrWvjjH9DOf/UmmrzX+3JH/YysJTOjZtkHzhz4ZYP7Ed7P9F6WG9n7+P3MDZhLkl1PR9B2Gk3HT1BZ0Xha9YenC3NFyv18/8SbEvdzqP13ZPlvLtchl9+4fyuxjCcT2WYO0uQ/0nvCnAPiL2jDiFr2OixceRNdsOQsem7gtwRGBjihEWbqhAOpb/YXaY+37ZYTEmGCjmxD6QTEZEAmF+I5kmutyDoge91zQc1G2pq7JkWaFT32rZZckXI/X5pyNp2buJ9s9/IZDKViwHMfbzt9uxnYM9tyh5QNrZvlN8y6lixjkiwn0j/N77CuijL3c/HDc+B+AgAnNMKs+dPv6b4Vj1HbW95KHe/el+yoUIppI6QnIo3zVdxt7niusx+Ry4vSls5tkT6dcV3k5hLnl60Y8+YkK5rwEWrfNcmK/mvHXdHU3Q+iB064kT6252Fmd3Lzc/R/co4ml/CQmQuUXTMhkrCvARcZ/2HNn1dqseeC9/BzS+iU+z8D9xMIiFAA1v/PK3Tfysfo+T+9RB2770u77vxW51SEIG/0jJxLyY7bPHDOcNfNCJj0xIi3XXnRE8TXOcqJVfK/A/56v1SM0tnWf3iGtoVyP187dA5988jeJPQezVwZkTckTsLz4Wak0LVMZFsm6Xl10dDKmdv1L/GyIic+bBstbJs2b6TzlpxN1z71Ddr8f5sJhAEiFJCVa59NxajtLbskYjTBfhD5HKK863E/3Ycrfy8XJeNARO7DbkXPcx9uZUeh2xr1fyUsM/bVrkhlRZubuyLlfh48UbmfQ9meGjfjchuz3+QJqSA/aNb3M/dkl1o16/8wB+fP+SE76dPh78OTLzxBH//ecfTrP/6KQFjYsQiEZNaUo6nn6FPTxexd5iPYyJj+0JmhHOMQeK7E7rPZ0iC5D7Wk3Axt9/xuYg3Zx5mF02wLl1xYs34d9T5+PS38d/ed80qk+qZ/hY7f+yPp9YZZzsKf72OnSnnbZffbUS/VMmlXmMVXuflE0o16Zf80f5Z0JjiNc5A2vLaR5j81n/pW3kygHECESoQ63aPvs5fT1H0OpAaR0els09M0jKuRzuVkIkL+jGm7DXNP5nn4lADvdum1iEYQl/3uZ7T42UdSAeo+8LO0q/qWC2pyyoUWIXuahf69gyyYzt/Hf5rw2OnrKH2bCbj160LEgmcXYNvtkp9PrHuSLvzh+fTCxrUEygNEqIR0T5tJ8z4+x33wpd9CUc7F2PPDmmzLBYw8gXGuJ51/RE6k+Ha+yOWfgz1GP78VH+GLARcELiqDTKgGJTWdAS15u5hzROk/Tfpzi5yAZZc3bN5A856cT7es/A6B8gERKinZ99FfT3uMGeu3W/rTyk8FUVghSkWJXOBr2i/KRETqPkjkxKihPZPSm1ntfjd5ky3zguUyHz1ULrkTIr9t0pMUt9pqNWnrtDnyJzySL0TmsT9Z+wRd8PAFift5gUA5gQiVnN6/O5V6pp9KlHM6PB8yLYk9z6xJu9a0nTPiYfMmlgnlZlM3FyuygmddGncoZIJk4YuQ1E9nBcoFxvlZ0ySpoVWzLic349m1YpI2vL4pdT83r4D7KTsQoQjIvo/+hvRbNahJS2TFQS/8ZbMc7lC8CY3G3XDBYiJjHIZVi+y6aHK/DdAHyRMKr52yI1rEXBBzTqJJhiNlo2uy17P9bnYCq/r547XL6fyHL6S1cD9RABGKiN7pp9HliStq5mSaZUJWYFh7xp2MH1QLpw65591SGN5suxR2rhZvlcztg3w7LTjeGfJcbLh4eS6LWJvmROvyx65I3M8tBOIBIhQZHeP2pUUnX03tY8Z6QpKSFwmZdztElNvWiE7marRLauKE8hmQN2VA51DuzaRPiWACkv5KlvMMmn0VZnu2W9r5WIcjebaundOgbvP0g/7jj7+m85ZeSL98GfN+YgOTFSPjpU1/ooVPPUA7vfHNNHmP99vbrRAJfZKnNB9hwR4tTGSTJTCCB8puWzMp0E6adP+x/zX/I9E4o9nsB3m/27+Pn9/Fr0v7WHKCR255EpL8rmz/r35yAZ3x4Ln08qsvE4gPiFCEvPaX12nJ08vp+T+/mDijCTRm59FkF0BzwQp5a1iTC3rdWfgZ/Dwre58WHu13yEqKYO5KP4L4aSI2m9HPJfJWW5AkX6Bkbh888TJipn/y7dZuXEezHjid7vzV3QTiBe1Y5Kiwuveo09JvX7VziGw7RS5MzmU6duid9G1slcbsNhc8S3Knfbh8iQXTfJ6Qbrf8bIe83MbeRmw2tHk88RUUGwNrvRl9e0UfXfXEAtq4eSOBuIEIVYRZiQj1HHlakhWNy26Q1JAD8cmIRpiaTWw0rsrMljYLohnxyYSIZ03u+W2WZEPnbHd4pmNzHyYqJkeS1vUQEyD3mN9tepHOXfp5+vELTxCoBhChCqHCaiVEsyYdR/6omXM3vF1L3Y5OhL1z1ZiT8sSMbdfMZUkbNjtx8YJoYjOePRHKZULEh/edEN2Qup9raAPcT6WACFWQ7g9/ii4/8vR0TaB8K+YtDSuE91VATds3Ij3yJXKCJJq4LLJD7t6JqbmFy2xnxyYrpgaLb8NauN8l2c9ZSy9K3M+TBKoHRKiiKFfU94lemrrnh4h/Iyt3Qv7wvvDnG+lt7CRG8mdo5+cqcSfE13GWnvCwE1h15J3fzrRl2S4l7ucXt9I/wv1UGohQxen56OnU85EzdGCdn3BI5H0hI4mmQXZeaLxTOXIOiec8Wbl8J99mWbeUWydIXXx+44up+3kc7qfyQIRqgHJF/afclIbWaWtlTntgbVZ6iydAzBF5a1yTF2IrpHSLsLm8hzJRIbLhtHM7RHyNZ0l+YP3Abx9OBOhiuJ+aABGqEb1HnEGXH3E6WyTfnU/mQurcbVp4TN6T3jfoD8l7X76YExp7ygVv03L3mUmHA5s30ZlLLkpFCNQHiFDNUF/93H/yzelPf/RLexkuKEak2Nwg/pMH2WZKo/0WDXKrJBJp58NOtZD6+Ulf/tELT9HM+8+C+6khEKGa0jvtDOqZdqYWE0lm8qLLfPxhd5KNYbQ5X8zbtmF0i4+Q6cCZuSC1XvVXn7iWvvmLhQTqCUSoxkzdcxL1dV6RLmBPDUPwRNQwsZFsa+a5IZ4X8SF6MmLksqFBNpHxsbVP0ulLLklC6HUE6gtEqOao76KfP/0i6uo4zp7OwZ0PH0VrXG+avAXxyTocEzjzIXhNIkgDr22kLy+/lq6D+wEEEQKaWR3HU8/hZ6SuKD9Zkbg4KdhomSdSTmka5gaZFmxZ4n5OXXIp3A+wQISARYXVPYefSV0fOL5xxrRpwezQPunLWmr0iayebuWyn39Yfh1dC/cDckCEQAOzDjiOeg47S2dF5LVoRni2GGITkX9OmHI/T9HJD8H9gOZAhEBTlCuad9TF1LnPEeRNVByUubWsyTsHzc2Qlmn+c37/V+maX3yXANgSWNQMNEV99/ydv3yINiRt1ORxH0hXcnRTGYXdzlzK37fy5Wfo6HtOpft/+wgBsDXghMA2UW1Z/6dvyULrnBPi7ZkZop+7/Js09yfXEQDbA0QIbDe9Hz6Leg49Ow1/7IL4LBNas+FFmv3QZfRokgEBsL1AhMAO0b7rWOr/1K3UPnqc54Su+fk/U+/ybyVtHE67ADsGRAgMie5Jn6Xj9z4izY4WJAL06NqfEgBDASIEAAjKKAIAgIBAhAAAQYEIAQCCAhECAAQFIgQACApECAAQFIgQACAoECEAQFAgQgCAoECEAABBgQgBAIICEQIABAUiBAAICkQIABAUiBAAICgQIQBAUCBCAICgQIQAAEGBCAEAggIRAgAEBSIEAAgKRAgAEBSIEAAgKBAhAEBQIEIAgKBAhAAAQYEIAQCCAhECAAQFIgQACApECAAQFIgQACAoECEAQFAgQgCAoECEAABBgQgBAIICEQIABAUiBAAICkQIABAUiBAAICgQIQBAUCBCAICgQIQAAEGBCAEAggIRAgAEBSIEAAgKRAgAEBSIEAAgKBAhAEBQIEIAgKBAhAAAQYEIAQCCAhECAAQFIgQACApECAAQFIgQACAo/w9Rzo5nl5U2BAAAAABJRU5ErkJggg==';

  const buffer = Buffer.from(base64String, 'base64');

  response.contentType('image/png');

  return response.send(buffer);
};