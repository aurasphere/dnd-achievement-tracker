import { useEffect, useState } from "react";
import PageLayout from "./page-layout";

export const pagePath = "/loot-splitter";
export default function LootSplitterPage() {
  const [partyMembers, setPartyMembers] = useState(4);
  const [items, setItems] = useState([{ quantity: "", name: "", value: "" }]);
  const [average, setAverage] = useState(0);
  const [total, setTotal] = useState(0);
  const [splittedItems, setSplittedItems] = useState([]);
  const [pp, setPp] = useState("");
  const [gp, setGp] = useState("");
  const [ep, setEp] = useState("");
  const [sp, setSp] = useState("");
  const [cp, setCp] = useState("");

  const splitLoot = () => {
    const tmpTotal =
      playerCurrentLootValue(items) +
      (pp || 0) * 10 +
      (gp || 0) +
      (ep || 0) / 2 +
      (sp || 0) / 10 +
      (cp || 0) / 100;
    setTotal(tmpTotal);
    setAverage(tmpTotal / partyMembers);

    const tempSplittedItems = Array(partyMembers)
      .fill(0)
      .map(() => []);

    // Splits the items
    [...items]
      .sort((a, b) => b.value - a.value)
      .forEach(({ quantity = 1, name = "", value = 0 }) => {
        if (quantity === "") quantity = 1;
        for (let i = parseInt(quantity); i > 0; i--) {
          const poorestPlayerItems =
            tempSplittedItems[pickPoorestPlayerIndex(tempSplittedItems)];
          const lastPoorestPlayerItem =
            poorestPlayerItems[poorestPlayerItems.length - 1];
          if (lastPoorestPlayerItem && lastPoorestPlayerItem.name === name) {
            lastPoorestPlayerItem.quantity =
              parseInt(lastPoorestPlayerItem.quantity) + 1;
          } else {
            poorestPlayerItems.push({ quantity: 1, name, value });
          }
        }
      });

    // Splits the money
    splitMoney(pp, "PP", 10, tempSplittedItems);
    splitMoney(gp, "GP", 1, tempSplittedItems);
    splitMoney(ep, "EP", 0.5, tempSplittedItems);
    splitMoney(sp, "SP", 0.1, tempSplittedItems);
    splitMoney(cp, "CP", 0.01, tempSplittedItems);

    setSplittedItems(tempSplittedItems);
  };

  useEffect(splitLoot, [partyMembers, items, pp, gp, ep, sp, cp]);

  const splitMoney = (currency, currencyName, value, splittedItems) => {
    for (let money = currency; money > 0; money--) {
      const poorestPlayerIndex = pickPoorestPlayerIndex(splittedItems);
      const poorestPlayerLoot = splittedItems[poorestPlayerIndex];
      const lastPlayerLootItem =
        poorestPlayerLoot[poorestPlayerLoot.length - 1];
      if (lastPlayerLootItem && lastPlayerLootItem.name === currencyName) {
        lastPlayerLootItem.quantity = parseInt(lastPlayerLootItem.quantity) + 1;
      } else {
        poorestPlayerLoot.push({ name: currencyName, quantity: 1, value });
      }
    }
  };

  const pickPoorestPlayerIndex = (splittedItems) => {
    let index = 0;
    let minValue = Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < splittedItems.length; i++) {
      let currentValue = playerCurrentLootValue(splittedItems[i]);
      if (currentValue < minValue) {
        minValue = currentValue;
        index = i;
      }
    }
    return index;
  };

  const playerCurrentLootValue = (playerLoot) =>
    playerLoot.reduce(
      (prev, curr) =>
        prev + (curr.quantity === "" ? 1 : curr.quantity) * (curr.value ?? 0),
      0
    );

  const updateItem = (index, update) => {
    const clonedItems = [...items];
    update(clonedItems[index]);
    setItems(clonedItems);
  };

  const onLastItemRowBlur = () => {
    const lastItem = items.slice(-1)[0];
    if (lastItem.value && lastItem.name) {
      setItems(items.concat({ quantity: "", name: "", value: "" }));
    }
  };

  const deleteItem = (index) => {
    const clonedItems = [...items];
    clonedItems.splice(index, 1);
    setItems(clonedItems);
  };

  const toItemRow = (e, i) => (
    <tr key={i}>
      <td>
        <input
          autoFocus={true}
          type="number"
          placeholder="1"
          onChange={({ target }) =>
            updateItem(
              i,
              (item) => (item.quantity = Math.min(target.value, 99))
            )
          }
          onBlur={onLastItemRowBlur}
          className="form-control"
          value={e.quantity}
        />
      </td>
      <td>
        <input
          type="text"
          required={e.value || e.quantity}
          onChange={({ target }) =>
            updateItem(i, (item) => (item.name = target.value))
          }
          onBlur={onLastItemRowBlur}
          className="form-control"
          value={e.name}
        />
      </td>
      <td>
        <input
          type="number"
          required={e.name || e.quantity}
          onChange={({ target }) =>
            updateItem(i, (item) => (item.value = target.value))
          }
          onBlur={onLastItemRowBlur}
          className="form-control"
          value={e.value}
        />
      </td>
      <td>
        {i !== 0 && (
          <h3 onClick={() => deleteItem(i)} className="cursor-pointer">
            X
          </h3>
        )}
      </td>
    </tr>
  );

  const round = (value) => Math.round(value * 100) / 100;

  return (
    <PageLayout pagePath={pagePath}>
      <div className="row mt-2">
        <h1 className="col text-center">Loot Splitter</h1>
      </div>
      <div className="row text-center justify-content-center align-items-center">
        <p className="col-3 mb-0">Number of party members:</p>
        <input
          type="number"
          onChange={({ target }) => {
            setPartyMembers(Math.min(parseInt(target.value) || 1, 99));
          }}
          className="form-control col-1"
          value={partyMembers}
        />
      </div>
      <div className="row mt-2">
        <h2 className="col text-center">Items</h2>
      </div>
      <div className="row justify-content-center">
        <table className="col-10">
          <thead>
            <tr>
              <th className="text-center">Quantity</th>
              <th className="text-center">Name</th>
              <th className="text-center">Value (GP)</th>
            </tr>
          </thead>
          <tbody>{items.map(toItemRow)}</tbody>
        </table>
      </div>
      <div className="row mt-2">
        <h2 className="col text-center">Coins</h2>
      </div>
      <div className="row justify-content-center">
        <table className="col-10">
          <thead>
            <tr>
              <th className="text-center">PP</th>
              <th className="text-center">GP</th>
              <th className="text-center">EP</th>
              <th className="text-center">SP</th>
              <th className="text-center">CP</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <input
                  type="number"
                  onChange={({ target }) => {
                    setPp(Math.min(target.value, 99999));
                  }}
                  className="form-control"
                  value={pp}
                />
              </td>
              <td>
                <input
                  type="number"
                  onChange={({ target }) => {
                    setGp(Math.min(target.value, 99999));
                  }}
                  className="form-control"
                  value={gp}
                />
              </td>
              <td>
                <input
                  type="number"
                  onChange={({ target }) => {
                    setEp(Math.min(target.value, 99999));
                  }}
                  className="form-control"
                  value={ep}
                />
              </td>
              <td>
                <input
                  type="number"
                  onChange={({ target }) => {
                    setSp(Math.min(target.value, 99999));
                  }}
                  className="form-control"
                  value={sp}
                />
              </td>
              <td>
                <input
                  type="number"
                  onChange={({ target }) => {
                    setCp(Math.min(target.value, 99999));
                  }}
                  className="form-control"
                  value={cp}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="row mt-4">
        <h2 className="col text-center">Loot per party member</h2>
      </div>
      <div className="row">
        <p className="col text-center mb-0">
          Total value: {round(total) + " GP"}
        </p>
      </div>
      <div className="row">
        <p className="col text-center">
          Average value: {round(average) + " GP"}
        </p>
      </div>
      <ol>
        {splittedItems.map((playerLoot, i) => (
          <li key={i}>
            <p>
              {playerLoot
                .map(
                  ({ name, quantity, value }) =>
                    quantity +
                    " " +
                    name +
                    " (" +
                    round(value * quantity) +
                    " GP)"
                )
                .join(", ") +
                " Total: " +
                round(playerCurrentLootValue(playerLoot)) +
                " GP"}
            </p>
          </li>
        ))}
      </ol>
    </PageLayout>
  );
}
